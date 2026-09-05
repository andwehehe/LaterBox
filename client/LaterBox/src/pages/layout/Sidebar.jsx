import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import user2 from "../../assets/images/user-2.jpg";
import {
  LayoutDashboard,
  Bookmark,
  User,
  X,
} from "lucide-react";

// Sidebar is intentionally restricted to pages that actually appear in
// the provided designs. Don't add extra links here unless a matching
// page exists — the whole point is this list stays in sync with what's
// actually built.
const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/saved-links", label: "Saved Links", icon: Bookmark },
  { to: "/profile", label: "Profile", icon: User },
];

function Sidebar({ mobileOpen, onClose }) {

  const { userData } = useUserContext();

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

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          <ul className="space-y-1">
            {navItems.map(({ to, label, icon: Icon, end }) => (
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
        </nav>

        {/* User footer */}
        <div className="border-t border-panel-border p-4">
          <div className="flex items-center gap-3">
            {user2 ? (
              <img
                src={user2}
                alt={userData.username}
                className="h-9 w-9 rounded-full"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent-light">
                {/* {placeholder} */}
                PH
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{userData.username}</p>
              <p className="truncate text-xs text-muted">Id: {userData.id}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;