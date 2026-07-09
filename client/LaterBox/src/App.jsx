import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import LandingPage from "./pages/landing/LandingPage";
import CreateAccount from "./pages/account/CreateAccount";
import SignIn from "./pages/account/SignIn";
import SavedLinks from "./pages/saved-links/SavedLinks";
import BookmarkDetail from "./pages/saved-links/BookmarkDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/saved-links" element={<SavedLinks />} />
        <Route path="/saved-links/:id" element={<BookmarkDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;