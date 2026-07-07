import { useState } from "react";
import { Link } from "react-router-dom";

const links = ["Features", "Integrations", "Pricing", "Changelog"];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-panel-border" id="landing-page">
      <nav className="page-container flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex gap-10 items-center">
          <a href="/dashboard" className="flex items-center gap-2 font-semibold text-white">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent text-sm">
              ⚡
            </span>
            LaterBox
          </a>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-8 text-sm text-muted lg:flex">
            {links.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="transition hover:text-white">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop auth actions */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Login link */}
          <Link to="/login" className="text-sm font-medium text-white hover:text-muted">
            Log in
          </Link>
          {/* Signup / get started link */}
          <Link
            to="/signup"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile: compact CTA + hamburger toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Mobile signup CTA Link */}
          <Link
            to="/create-account"
            className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white transition hover:bg-accent-light sm:px-4 sm:text-sm"
          >
            Get Started
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-panel-border text-white"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-panel-border lg:hidden">
          <ul className="page-container flex flex-col gap-4 py-5 text-sm text-muted">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="block transition hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
            <li className="pt-2">
              {/* Mobile login link */}
              <Link to="/login" className="block font-medium text-white" onClick={() => setOpen(false)}>
                Log in
              </Link>
            </li>
            <li>
              {/* Mobile signup link */}
              <Link to="/create-account" className="block font-medium text-white" onClick={() => setOpen(false)}>
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar