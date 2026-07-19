import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

const MobileMenuContext = createContext(() => {});

// eslint-disable-next-line react-refresh/only-export-components
export function useMobileMenu() {
  return useContext(MobileMenuContext);
}

function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark text-white">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <MobileMenuContext.Provider value={() => setMobileOpen(true)}>
        <div className="lg:pl-64">
          <Outlet />
        </div>
      </MobileMenuContext.Provider>
    </div>
  );
}

export default AppShell;