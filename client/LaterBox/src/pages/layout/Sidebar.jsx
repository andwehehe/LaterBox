import { NavLink } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import user2 from "../../assets/images/user-2.jpg";
import {
  LayoutDashboard,
  Bookmark,
  User,
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

const mobileNavItems = [navItems[1], navItems[0], navItems[2]];

function Sidebar() {

  const { userData } = useUserContext();

  return (
    <>
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-panel-border bg-panel lg:flex"
      >
        {/* Logo row */}
        <div className="flex items-center justify-between px-5 py-5">
          <a href="/" className="flex items-center gap-2 font-semibold text-white">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent text-sm">
              ⚡
            </span>
            LaterBox
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          <ul className="space-y-1">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
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

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-panel-border bg-panel/95 px-4 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur lg:hidden"
      >
        <ul className="mx-auto flex max-w-sm items-end justify-around">
          {mobileNavItems.map(({ to, label, icon: Icon, end }) => (
            <li key={to} className="flex flex-1 justify-center">
              <NavLink
                to={to}
                end={end}
                className="flex min-w-16 flex-col items-center gap-1 px-3 py-1.5 text-[11px] font-medium text-muted transition"
              >
                {({ isActive }) => (
                  <>
                    {to === "/dashboard" ? (
                      <span
                        className={`-mt-7 flex h-14 w-14 items-center justify-center rounded-full border-4 border-panel ${
                          isActive ? "bg-accent text-white" : "bg-[#0d0d18] text-muted"
                        }`}
                      >
                        <Icon size={21} />
                      </span>
                    ) : (
                      <Icon
                        size={18}
                        className={isActive ? "text-accent-light" : undefined}
                      />
                    )}
                    <span className={isActive ? "text-accent-light" : undefined}>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;