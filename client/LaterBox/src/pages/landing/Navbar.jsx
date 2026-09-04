import { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Menu, X } from "lucide-react";


function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-panel-border" id="landing-page">
      <nav className="page-container flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex gap-10 items-center">
          <a href="/dashboard" className="flex items-center gap-2 font-semibold text-white">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent text-sm">
              <Bookmark size={16} />
            </span>
            LaterBox
          </a>

        </div>

        {/* Desktop auth actions (keep) */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link to="/login" className="text-sm font-medium text-white hover:text-muted">
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile: only show primary CTA (no menu) */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            to="/create-account"
            className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white transition hover:bg-accent-light sm:px-4 sm:text-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar