import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./FormLayout";
import FormField from "./FormField";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, GoogleIcon } from "../../assets/icons/icons";
import { loginAccount } from "../../services/authService.js";
import { useUserContext } from "../../contexts/UserContext.jsx";

function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  // const [rememberMe, setRememberMe] = useState(true);
  const [status, setStatus] = useState({ loading: false, error: "" });
  const { setUserData } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) errors.email = "Please enter a valid email address.";
    if (!form.password || form.password.length < 6) errors.password = "Password must be at least 6 characters.";
    setFieldErrors({ email: errors.email || "", password: errors.password || "" });
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus({ loading: true, error: "" });

    try {      
      const data = await loginAccount(form.email, form.password);
      setUserData({ email: data.email, username: data.username, id: data.user_id });

      navigate("/dashboard");
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    } finally {
      setForm((prev) => ({ ...prev, password: "" }));
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Enter your credentials to access your bookmarks">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-panel-border bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:border-muted"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-panel-border" />
        <span className="text-xs font-medium tracking-wide text-muted">OR</span>
        <span className="h-px flex-1 bg-panel-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField
          id="email"
          label="Email Address"
          type="email"
          icon={<MailIcon />}
          placeholder="name@gmail.com"
          autoComplete="email"
          value={form.email}
          onChange={handleChange("email")}
        />
        {fieldErrors.email && <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>}

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-medium text-white sm:text-sm">
              Password
            </label>
            <a href="#forgot" className="text-xs font-medium text-accent-light hover:underline sm:text-sm">
              Forgot password?
            </a>
          </div>
          <FormField
            id="password"
            label=""
            type={showPassword ? "text" : "password"}
            icon={<LockIcon />}
            placeholder="Enter your password"
            autoComplete="current-password"
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
          
        {/* Might use later */}
        {/* <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-panel-border bg-dark accent-accent"
          />
          Remember me for 30 days
        </label>

        */}
        {status.error && (
          <p className="text-sm text-red-400" role="alert">
            {status.error}
          </p>
        )}

          <button
          type="submit"
          disabled={status.loading}
          className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {status.loading ? (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : null}
          {status.loading ? "Signing In…" : "Sign In"}
        </button>

        <p className="pt-1 text-center text-sm text-muted">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-accent-light hover:underline">
            Register now
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default SignIn;