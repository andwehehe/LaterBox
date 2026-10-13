import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import AuthLayout from "./FormLayout";

const emptyCode = Array(6).fill("");

function VerifyEmail() {
  const { state } = useLocation();
  const email = state?.email || "your email address";
  const [code, setCode] = useState(emptyCode);
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);

  const fillCodeFrom = (index, value) => {
    const digits = value.replace(/\D/g, "").slice(0, 6 - index);
    if (!digits) return;

    const nextCode = [...code];
    digits.split("").forEach((digit, offset) => {
      nextCode[index + offset] = digit;
    });
    setCode(nextCode);
    inputRefs.current[Math.min(index + digits.length, 5)]?.focus();
    setMessage("");
  };

  const handleChange = (index, value) => {
    if (!value) {
      const nextCode = [...code];
      nextCode[index] = "";
      setCode(nextCode);
      return;
    }
    fillCodeFrom(index, value);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const targetIndex = code[index] ? index : Math.max(index - 1, 0);
      const nextCode = [...code];
      nextCode[targetIndex] = "";
      setCode(nextCode);
      inputRefs.current[targetIndex]?.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event, index) => {
    event.preventDefault();
    fillCodeFrom(index, event.clipboardData.getData("text"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code.some((digit) => !digit)) {
      setMessage("Enter all six digits to continue.");
      inputRefs.current[code.findIndex((digit) => !digit)]?.focus();
      return;
    }
    setMessage("Code verification is not connected yet. Your code has not been submitted.");
  };

  return (
    <AuthLayout compact title="Verify your email" subtitle="One quick step to finish setting up your account.">
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent-light">
          <Mail size={22} aria-hidden="true" />
        </span>
        <p className="text-sm leading-6 text-muted">
          Enter the 6-digit code sent to
          <span className="mt-1 block break-all font-medium text-white">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-6 gap-2 sm:gap-3" role="group" aria-label="Six-digit verification code">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(element) => { inputRefs.current[index] = element; }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onPaste={(event) => handlePaste(event, index)}
              aria-label={`Verification digit ${index + 1}`}
              className="aspect-square min-w-0 rounded-lg border border-panel-border bg-dark/60 text-center text-xl font-semibold text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 sm:text-2xl"
            />
          ))}
        </div>

        {message && <p className="text-center text-sm text-muted" role="status">{message}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-light"
        >
          Verify email
        </button>
      </form>

      <div className="mt-5 space-y-3 text-center text-sm">
        <p className="text-muted">
          Didn&apos;t receive a code?{" "}
          <button
            type="button"
            onClick={() => setMessage("Resending codes is not connected yet.")}
            className="font-medium text-accent-light hover:underline"
          >
            Resend code
          </button>
        </p>
        <Link to="/signup" className="inline-flex items-center gap-1.5 text-muted transition hover:text-white">
          <ArrowLeft size={14} aria-hidden="true" />
          Change email address
        </Link>
      </div>
    </AuthLayout>
  );
}

export default VerifyEmail;