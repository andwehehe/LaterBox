import { Link, Outlet, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import BrandLogo from "../../components/BrandLogo.jsx";
import { useUserContext } from "../../contexts/UserContext.jsx";
import Sidebar from "../layout/Sidebar";

function AppShell() {
  const { pathname } = useLocation();
  const { userData } = useUserContext();
  const initials = userData?.username?.slice(0, 2).toUpperCase() ?? "";
  const breadcrumb = pathname.startsWith("/saved-links") ? "saved-links" : pathname.slice(1);

  return (
    <div className="min-h-screen bg-dark pb-24 text-white lg:pb-0">
      <Sidebar />
      <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-panel-border bg-panel px-5 lg:hidden">
        <Link to="/dashboard" aria-label="Go to dashboard" className="flex h-8 items-center gap-1.5">
          <BrandLogo markSize="h-8 w-8" />
          <span className="text-xs font-medium text-muted">/{breadcrumb}</span>
        </Link>
        <Link
          to="/profile"
          aria-label="Open profile"
          title="Open profile"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent-light transition hover:bg-accent/30"
        >
          {initials || <User size={17} />}
        </Link>
      </header>
      <div className="lg:pl-64">
        <Outlet />
      </div>
    </div>
  );
}

export default AppShell;