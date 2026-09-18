import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

function AppShell() {
  return (
    <div className="min-h-screen bg-dark pb-24 text-white lg:pb-0">
      <Sidebar />
      <div className="lg:pl-64">
        <Outlet />
      </div>
    </div>
  );
}

export default AppShell;