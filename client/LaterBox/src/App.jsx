import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landing/LandingPage";
import CreateAccount from "./pages/account/CreateAccount";
import SignIn from "./pages/account/SignIn";
import SavedLinks from "./pages/saved-links/SavedLinks";
import BookmarkDetail from "./pages/saved-links/BookmarkDetail";
import Settings from "./pages/settings/Settings";
import AppShell from "./pages/layout/AppShell";

function App() {
  return (
    <BrowserRouter basename="/LaterBox">
      <AppShell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/saved-links" element={<SavedLinks />} />
          <Route path="/saved-links/:id" element={<BookmarkDetail />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;