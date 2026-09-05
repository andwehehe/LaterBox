import { Zap } from "lucide-react";

function AuthLayout({ title, subtitle, children, compact = false }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-dark">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-accent-light/10 blur-3xl" />
      </div>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:pt-10 sm:pb-3">
        <div className={`w-full ${compact ? "max-w-[440px]" : "max-w-[560px]"} rounded-2xl border border-panel-border bg-panel/70 p-5 backdrop-blur sm:p-7`}>
          <div className="mb-5 flex flex-col items-center text-center">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-dark">
              <Zap size={20} strokeWidth={2.25} aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold text-white">LaterBox</p>
            <h1 className="mt-4 text-2xl font-bold text-white sm:text-[26px]">
              {title}
            </h1>
            <p className="mt-1 text-sm text-muted">{subtitle}</p>
          </div>

          {children}
        </div>
      </main>

      <footer className="relative z-10 py-3 text-center text-xs text-muted">
        © 2026 LaterBox Inc. All rights reserved.
      </footer>
    </div>
  );
}

export default AuthLayout;