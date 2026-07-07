import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./FormLayout";
import FormField from "./FormField";
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, GoogleIcon } from "../../assets/icons/icons";

/**
 * SECURITY / DATA HANDLING NOTES — read before wiring this up
 * ------------------------------------------------------------
 * - Every field below (username, email, password, confirmPassword) lives
 *   only in this component's React state (useState), for as long as the
 *   user is filling out the form. Nothing here is ever written to
 *   localStorage, sessionStorage, or a cookie by this component.
 * 
 * - On submit, the values are sent ONCE, directly to your backend over
 *   HTTPS (see the fetch call in handleSubmit). Swap the placeholder
 *   endpoint for your real registration route.
 * 
 * - Password hashing (bcrypt / argon2 / scrypt) must happen server-side.
 *   Never hash, encrypt, or "protect" the password in the browser —
 *   client-side code is visible/bypassable, so it provides zero real
 *   security and can give a false sense of safety.
 * 
 * - This component clears the password fields from state immediately
 *   after a submit attempt (success or failure) so plaintext doesn't
 *   linger in memory longer than necessary.
 * 
 * - Your backend should still independently validate everything here
 *   (uniqueness, password strength, email format) — client checks are
 *   for UX only, not a security boundary.
 */

function CreateAccount() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState({ loading: false, error: "" });

  // a function that returns a function that updates the form state for a given field
  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: false, error: "" });

    if(!form.username || !form.email || !form.password || !form.confirmPassword) {
      setStatus({ loading: false, error: "Please fill in all fields." });
      return;
    }
    if (form.password !== form.confirmPassword) {
      setStatus({ loading: false, error: "Passwords do not match." });
      return;
    }
    if (!agreed) {
      setStatus({ loading: false, error: "Please agree to the Terms of Service and Privacy Policy." });
      return;
    }

    setStatus({ loading: true, error: "" });
    try {
      // Sent directly over HTTPS to the backend — replace with your real
      // auth endpoint. The backend is responsible for hashing the
      // password before it ever touches a database.
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      // Success: hand off to your router / redirect logic here.
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    } finally {
      // Drop password fields from memory regardless of outcome.
      setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Start organizing your digital world today.">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField
          id="username"
          label="Username"
          icon={<UserIcon />}
          placeholder="Alberto Jr. Du bist gut genug"
          autoComplete="username"
          value={form.username}
          onChange={handleChange("username")}
        />

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

        <FormField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          icon={<LockIcon />}
          placeholder="Enter your password"
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

        <FormField
          id="confirmPassword"
          label="Confirm Password"
          type={showConfirm ? "text" : "password"}
          icon={<LockIcon />}
          placeholder="Confirm your password"
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

        <label className="flex items-start gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-panel-border bg-dark accent-accent"
          />
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

        {status.error && (
          <p className="text-sm text-red-400" role="alert">
            {status.error}
          </p>
        )}

        <button
          type="submit"
          disabled={status.loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status.loading ? "Creating Account…" : "Create Account →"}
        </button>

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-panel-border" />
          <span className="text-xs font-medium tracking-wide text-muted">
            OR CONTINUE WITH
          </span>
          <span className="h-px flex-1 bg-panel-border" />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-panel-border bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:border-muted"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <p className="pt-2 text-center text-sm text-muted">
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