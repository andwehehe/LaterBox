import {
  Plus, Bookmark,
  Zap, Star, ExternalLink,
  Pencil, Calendar, X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "../../components/components.jsx";
import { PopupMessage } from "../../components/components.jsx";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useBookmarkContext } from "../../contexts/BookmarkContext.jsx";
import { updateUsername } from "../../services/authService.js";
import AddBookmarkModal from "../saved-links/AddBookmarkModal.jsx";

const statIcons = [Bookmark, Zap, Star];

const barColors = ["bg-accent", "bg-sky-400", "bg-orange-400"];

function Profile() {
  const { userData, setUserData } = useUserContext();
  const { bookmarks, bookmarkStatus, setBookmarkStatus } = useBookmarkContext();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [username, setUsername] = useState(userData?.username ?? "");
  const [isSavingUsername, setIsSavingUsername] = useState(false);
  const navigate = useNavigate();
  const initials = userData?.username?.slice(0, 2).toUpperCase() ?? "";
  const visitedCount = bookmarks.filter(({ is_visited }) => is_visited).length;
  const favoriteCount = bookmarks.filter(({ is_starred }) => is_starred).length;
  const profileStats = [
    { label: "Total Bookmarks", value: bookmarks.length, delta: "Saved links" },
    { label: "Visited", value: visitedCount, delta: "Opened links" },
    { label: "Favorites", value: favoriteCount, delta: "Starred links" },
  ];
  const recentBookmarks = bookmarks.slice(0, 5);
  const platformCounts = bookmarks.reduce((counts, bookmark) => {
    const platform = bookmark.metadata?.platform || "Website";
    counts[platform] = (counts[platform] || 0) + 1;
    return counts;
  }, {});
  const platformSplit = Object.entries(platformCounts)
    .sort(([, first], [, second]) => second - first)
    .slice(0, 3)
    .map(([label, count]) => ({ label, percent: bookmarks.length ? Math.round((count / bookmarks.length) * 100) : 0 }));

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSavingUsername(true);
      const updatedUser = await updateUsername(username);
      setUserData((currentUser) => ({ ...currentUser, ...updatedUser }));
      setUsername(updatedUser.username);
      setIsEditModalOpen(false);
      setBookmarkStatus({ isSuccessful: true, message: updatedUser.message });
    } catch (error) {
      setBookmarkStatus({ isSuccessful: false, message: error.message });
    } finally {
      setIsSavingUsername(false);
    }
  };

  const handlePublicProfile = async () => {
    const profileUrl = `${window.location.origin}/LaterBox/profile/${userData?.id}`;

    try {
      await navigator.clipboard.writeText(profileUrl);
      setBookmarkStatus({ isSuccessful: true, message: "Profile link copied" });
    } catch {
      setBookmarkStatus({ isSuccessful: false, message: "Unable to copy profile link" });
    }
  };

  return (
    <div>
      {/* Top bar */}
      <header className="flex items-center gap-3 border-b border-panel-border px-4 py-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Profile Overview
        </p>

        <button onClick={() => setIsSaveModalOpen(true)} className="ml-auto flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light">
          <Plus size={16} />
          <span className="hidden sm:inline">Quick Save</span>
        </button>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent-light">
          {initials}
        </span>
      </header>

      <main className="space-y-6 p-4 sm:p-6">
        {/* Profile card */}
        <div className="flex flex-col gap-5 rounded-xl2 border border-panel-border bg-panel p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xl font-semibold text-accent-light">
              {initials}
            </span>
            <div>
              <h1 className="text-xl font-bold text-white sm:text-2xl">{userData?.username}</h1>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                <span>{userData?.email}</span>
                <span className="text-panel-border">•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  Joined March 2023
                </span>
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <button onClick={handlePublicProfile} className="flex items-center gap-1.5 rounded-lg border border-panel-border px-4 py-2 text-sm font-medium text-white hover:border-muted">
              <ExternalLink size={14} />
              Public Profile
            </button>
            <button onClick={() => { setUsername(userData?.username ?? ""); setIsEditModalOpen(true); }} className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light">
              <Pencil size={14} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {profileStats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} icon={statIcons[i]} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
              <button onClick={() => navigate("/saved-links")} className="text-sm font-medium text-accent-light hover:underline">
                View All
              </button>
            </div>
            <div className="divide-y divide-panel-border rounded-xl2 border border-panel-border bg-panel">
              {recentBookmarks.length ? recentBookmarks.map((item) => (
                <div key={item.bookmark_id} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      Saved {item.saved_on} •{" "}
                      <span className="rounded-md bg-dark px-1.5 py-0.5 text-[11px] text-muted">
                        {item.metadata?.platform || "Website"}
                      </span>
                    </p>
                  </div>
                </div>
              )) : <p className="p-4 text-sm text-muted">No saved bookmarks yet.</p>}
            </div>
          </div>

          {/* Sidebar: Top Collections + Platform Split */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">Top Collections</h2>
              <div className="space-y-2 rounded-xl2 border border-panel-border bg-panel p-3">
                {platformSplit.length ? platformSplit.map((platform) => (
                  <div key={platform.label} className="flex items-center justify-between gap-3 rounded-lg p-2">
                    <span className="truncate text-sm font-medium text-white">{platform.label}</span>
                    <span className="shrink-0 text-xs text-muted">{platform.percent}%</span>
                  </div>
                )) : <p className="p-2 text-sm text-muted">Platform insights appear after your first save.</p>}
              </div>
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">Platform Split</h2>
              <div className="space-y-4 rounded-xl2 border border-panel-border bg-panel p-4">
                {platformSplit.map((p, i) => (
                  <div key={p.label}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-muted">{p.label}</span>
                      <span className="font-medium text-white">{p.percent}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-panel-border">
                      <div
                        className={`h-1.5 rounded-full ${barColors[i % barColors.length]}`}
                        style={{ width: `${p.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {isSaveModalOpen && (
        <AddBookmarkModal
          isModalOpen={isSaveModalOpen}
          setIsModalOpen={setIsSaveModalOpen}
          setBookmarkStatus={setBookmarkStatus}
        />
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl border border-panel-border bg-panel p-6">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Edit Profile</h2>
                <p className="mt-1 text-sm text-muted">Update the name shown across your account.</p>
              </div>
              <button type="button" onClick={() => setIsEditModalOpen(false)} aria-label="Close" className="text-muted hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUsernameSubmit} className="space-y-4">
              <div>
                <label htmlFor="profile-username" className="mb-1.5 block text-sm font-medium text-white">Username</label>
                <input
                  id="profile-username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  minLength={2}
                  maxLength={50}
                  required
                  className="w-full rounded-lg border border-panel-border bg-dark/60 px-3 py-2.5 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-muted hover:text-white">Cancel</button>
                <button type="submit" disabled={isSavingUsername} className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60">
                  {isSavingUsername ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <PopupMessage isSuccessful={bookmarkStatus.isSuccessful} message={bookmarkStatus.message} />
    </div>
  );
}

export default Profile;