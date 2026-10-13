import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./FormLayout";
import FormField from "./FormField";
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from "../../assets/icons/icons";
import { registerAccount } from "../../services/authService.js";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

function CreateAccount() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({ username: "", email: "", password: "", confirmPassword: "", agreed: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: "" });
  const navigate = useNavigate();

  // a function that returns a function that updates the form state for a given field
  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errors = {};
    if (!form.username || form.username.length < 3) errors.username = "Please enter a username (min 3 chars).";
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) errors.email = "Please enter a valid email address.";
    if (!form.password || form.password.length < 6) errors.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match.";
    if (!agreed) errors.agreed = "You must agree to the Terms of Service and Privacy Policy.";

    setFieldErrors({
      username: errors.username || "",
      email: errors.email || "",
      password: errors.password || "",
      confirmPassword: errors.confirmPassword || "",
      agreed: errors.agreed || "",
    });

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, error: "" });

    if(!validate()) return;

    setStatus({ loading: true, error: "" });
    
    try {
      await registerAccount(form.username, form.email, form.password);
      navigate("/login");
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    } finally {
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
      <AuthLayout compact title="Create Account" subtitle="Start organizing your digital world today.">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div>
            <FormField
              id="username"
              label="Username"
              icon={<UserIcon />}
              placeholder="e.g. alex_dev"
              autoComplete="username"
              value={form.username}
              onChange={handleChange("username")}
            />
            {fieldErrors.username && <p className="mt-1 text-sm text-red-400">{fieldErrors.username}</p>}
          </div>

          <div>
            <FormField
              id="email"
              label="Email Address"
              type="email"
              icon={<MailIcon />}
              placeholder="alex@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange("email")}
            />
            {fieldErrors.email && <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>}
          </div>

          <div>
            <FormField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              icon={<LockIcon />}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange("password")}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-muted hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />
            {fieldErrors.password && <p className="mt-1 text-sm text-red-400">{fieldErrors.password}</p>}
          </div>

          <div>
            <FormField
              id="confirmPassword"
              label="Re-enter Password"
              type={showConfirm ? "text" : "password"}
              icon={<LockIcon />}
              placeholder="Re-enter password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="text-muted hover:text-white"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />
            {fieldErrors.confirmPassword && <p className="mt-1 text-sm text-red-400">{fieldErrors.confirmPassword}</p>}
          </div>

          <label className="flex items-center gap-2 text-sm text-muted">
            <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (e.target.checked) setFieldErrors((prev) => ({ ...prev, agreed: "" }));
                }}
                aria-invalid={Boolean(fieldErrors.agreed)}
                aria-describedby={fieldErrors.agreed ? "agreed-error" : undefined}
                className="absolute inset-0 h-4 w-4 cursor-pointer appearance-none rounded border border-panel-border bg-transparent checked:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {agreed && <Check className="pointer-events-none relative z-10 h-3 w-3 text-green-500" strokeWidth={3} aria-hidden="true" />}
            </span> 
            <span>
              I agree to the{" "}
              <a href="#terms" className="text-accent-light hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#privacy" className="text-accent-light hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {fieldErrors.agreed && (
            <p id="agreed-error" className="-mt-3 text-sm text-red-400" role="alert">
              {fieldErrors.agreed}
            </p>
          )}

          {status.error && (
            <p className="text-sm text-red-400" role="alert">
              {status.error}
            </p>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status.loading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : null}
            {status.loading ? "Creating Account..." : "Create Account"}
            {!status.loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </button>

          <p className="pt-1 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-accent-light hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </AuthLayout>
  );
}

export default CreateAccount;