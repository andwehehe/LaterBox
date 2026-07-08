import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./FormLayout";
import FormField from "./FormField";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, GoogleIcon } from "../../assets/icons/icons";

/**
 * SECURITY / DATA HANDLING NOTES
 * -------------------------------
 * - Email and password only live in this component's React state while
 *   the user is typing. Nothing here is written to localStorage,
 *   sessionStorage, or a cookie by this component.
 * 
 * - On submit, credentials are sent ONCE, directly to the backend over
 *   HTTPS (see the fetch call below). Swap the placeholder endpoint for
 *   your real login route.
 * 
 * - "Remember me" is intentionally disabled in this UI. If needed later,
 *   it should be implemented server-side (e.g. a longer-lived, httpOnly,
 *   Secure, SameSite cookie issued by the backend), NOT by saving a token
 *   or the password in browser storage.
 * 
 * - This component clears the password field from state immediately
 *   after a submit attempt (success or failure).
 */

function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  // const [rememberMe, setRememberMe] = useState(true);
  const [status, setStatus] = useState({ loading: false, error: "" });
  const navigate = useNavigate();

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      // Sent directly over HTTPS to the backend. On success, the server
      // should set an httpOnly session cookie — this component never
      // stores the credentials or a token itself.
      
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: form.email,
      //     password: form.password,
      //     // rememberMe,
      //   }),
      // });

      // if (!res.ok) {
      //   const data = await res.json().catch(() => ({}));
      //   throw new Error(data.message || "Invalid email or password.");
      // }

      // Success: hand off to your router / redirect logic here.
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
          className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60"
        >
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