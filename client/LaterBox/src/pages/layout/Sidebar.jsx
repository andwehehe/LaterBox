import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Bookmark,
  Star,
  FolderOpen,
  Tag,
  User,
  Settings,
  X,
} from "lucide-react";
import { currentUser } from "../dashboard/mockData.js";

// Sidebar is intentionally restricted to pages that actually appear in
// the provided designs. Don't add extra links here unless a matching
// page exists — the whole point is this list stays in sync with what's
// actually built.
const navGroups = [
  {
    label: "Main",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
      { to: "/saved-links", label: "Saved Links", icon: Bookmark },
      { to: "/favorites", label: "Favorites", icon: Star },
    ],
  },
  {
    label: "Library",
    items: [
      { to: "/collections", label: "Collections", icon: FolderOpen },
      { to: "/tags", label: "Tags", icon: Tag },
    ],
  },
  {
    label: "Account",
    items: [
      { to: "/profile", label: "Profile", icon: User },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-panel-border bg-panel transition-transform duration-200 ease-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo row */}
        <div className="flex items-center justify-between px-5 py-5">
          <a href="/" className="flex items-center gap-2 font-semibold text-white">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent text-sm">
              ⚡
            </span>
            LaterBox
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="text-muted hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted/70">
                {group.label}
              </p>
              <ul className="space-y-1">
                {group.items.map(({ to, label, icon: Icon, end }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                          isActive
                            ? "bg-accent text-white"
                            : "text-muted hover:bg-dark hover:text-white"
                        }`
                      }
                    >
                      <Icon size={17} />
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="border-t border-panel-border p-4">
          <div className="flex items-center gap-3">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-9 w-9 rounded-full"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent-light">
                {currentUser.avatarInitials}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{currentUser.name}</p>
              <p className="truncate text-xs text-muted">{currentUser.plan}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
