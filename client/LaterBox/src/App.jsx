import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landing/LandingPage";
import CreateAccount from "./pages/account/CreateAccount";
import SignIn from "./pages/account/SignIn";
import SavedLinks from "./pages/saved-links/SavedLinks";
import BookmarkDetail from "./pages/saved-links/BookmarkDetail";
import AppShell from "./pages/layout/AppShell";
import UserProvider from "./contexts/UserContext";
import BookmarkProvider from "./contexts/BookmarkContext";
import Profile from "./pages/profile/Profile";

const routerBasename = import.meta.env.BASE_URL === "/"
  ? undefined
  : import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  return (
    <UserProvider>
      <BookmarkProvider>
        <BrowserRouter basename={routerBasename}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/verify-email" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<SignIn />} />
            <Route element={<AppShell />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/saved-links" element={<SavedLinks />} />
              <Route path="/saved-links/:bookmark_id/:title" element={<BookmarkDetail />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BookmarkProvider>
    </UserProvider>
  );
}

export default App;