import { createContext, useContext, useState } from "react";
import Sidebar from "../layout/Sidebar";

const MobileMenuContext = createContext(() => {});

// Lets any page's header put a hamburger button that opens the
// mobile sidebar drawer, without prop-drilling the toggle everywhere.
// eslint-disable-next-line react-refresh/only-export-components
export function useMobileMenu() {
  return useContext(MobileMenuContext);
}

function AppShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark text-white">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <MobileMenuContext.Provider value={() => setMobileOpen(true)}>
        <div className="lg:pl-64">{children}</div>
      </MobileMenuContext.Provider>
    </div>
  );
}

export default AppShell;