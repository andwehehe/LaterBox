import {
  Bookmark,
  Zap, Star,
  Pencil, Calendar, X, LogOut,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatCard } from "../../components/components.jsx";
import { PopupMessage } from "../../components/components.jsx";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useBookmarkContext } from "../../contexts/BookmarkContext.jsx";
import { logoutAccount, updateUsername } from "../../services/authService.js";

const statIcons = [Bookmark, Zap, Star];

const barColors = ["bg-accent", "bg-sky-400", "bg-orange-400"];

function Profile() {
  const { userData, setUserData, isUserLoading } = useUserContext();
  const { bookmarks, bookmarkStatus, setBookmarkStatus, isBookmarkLoading } = useBookmarkContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [username, setUsername] = useState(userData?.username ?? "");
  const [isSavingUsername, setIsSavingUsername] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { setBookmarks } = useBookmarkContext();
  const navigate = useNavigate();
  const isLoading = isUserLoading || isBookmarkLoading;
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

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutAccount();
      setUserData(null);
      setBookmarks([]);
      setIsLogoutModalOpen(false);
      navigate("/login", { replace: true });
    } catch (error) {
      setBookmarkStatus({ isSuccessful: false, message: error.message });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div>
      {/* Top bar */}
      <header className="hidden items-center border-b border-panel-border px-4 py-4 sm:px-6 lg:flex">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Profile Overview
        </p>
      </header>

      <main className="space-y-6 p-4 sm:p-6" aria-busy={isLoading}>
        {/* Profile card */}
        {isLoading ? (
          <div className="flex animate-pulse flex-col gap-5 rounded-xl2 border border-panel-border bg-panel p-6 sm:flex-row sm:items-center sm:justify-between" aria-hidden="true">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 rounded-full bg-panel-border" />
              <div className="space-y-2">
                <div className="h-6 w-40 rounded bg-panel-border" />
                <div className="h-4 w-56 max-w-full rounded bg-panel-border" />
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <div className="h-10 w-full rounded-lg bg-panel-border sm:w-32" />
              <div className="h-10 w-full rounded-lg bg-panel-border sm:w-28" />
            </div>
          </div>
        ) : <div className="flex flex-col gap-5 rounded-xl2 border border-panel-border bg-panel p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xl font-semibold text-accent-light">
              {initials}
            </span>
            <div className="min-w-0">
              <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                <h1 className="min-w-0 break-words text-xl font-bold text-white sm:text-2xl">{userData?.username}</h1>
                <span className="min-w-0 break-all text-xs font-medium text-muted">
                  ID: {userData?.id}
                </span>
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                <span>{userData?.email}</span>
                <span className="hidden text-panel-border sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  Joined March 2023
                </span>
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 min-[400px]:w-auto min-[400px]:flex-row sm:shrink-0">
            <button onClick={() => { setUsername(userData?.username ?? ""); setIsEditModalOpen(true); }} className="flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light min-[400px]:w-auto sm:shrink-0">
              <Pencil size={14} />
              Edit Username
            </button>
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20 min-[400px]:w-auto sm:shrink-0"
            >
              <LogOut size={14} />
              Log Out
            </button>
          </div>
        </div>}

        {/* Stat cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {isLoading ? Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="h-[132px] animate-pulse rounded-xl2 border border-panel-border bg-panel p-5" aria-hidden="true">
              <div className="flex items-center justify-between">
                <div className="h-4 w-28 rounded bg-panel-border" />
                <div className="h-8 w-8 rounded-lg bg-panel-border" />
              </div>
              <div className="mt-3 h-8 w-16 rounded bg-panel-border" />
              <div className="mt-2 h-3 w-20 rounded bg-panel-border" />
            </div>
          )) : profileStats.map((stat, i) => (
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
            {isLoading ? (
              <div className="divide-y divide-panel-border rounded-xl2 border border-panel-border bg-panel" aria-hidden="true">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="animate-pulse space-y-2 p-4">
                    <div className="h-4 w-2/3 rounded bg-panel-border" />
                    <div className="h-3 w-1/2 rounded bg-panel-border" />
                  </div>
                ))}
              </div>
            ) : <div className="divide-y divide-panel-border rounded-xl2 border border-panel-border bg-panel">
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
            </div>}
          </div>

          {/* Sidebar: Platform Split */}
          <div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">Platform Split</h2>
              <div className="space-y-4 rounded-xl2 border border-panel-border bg-panel p-4" aria-busy={isLoading}>
                {isLoading ? Array.from({ length: 3 }, (_, index) => (
                  <div key={index} className="animate-pulse" aria-hidden="true">
                    <div className="mb-2 flex justify-between">
                      <div className="h-4 w-20 rounded bg-panel-border" />
                      <div className="h-4 w-10 rounded bg-panel-border" />
                    </div>
                    <div className="h-1.5 rounded-full bg-panel-border" />
                  </div>
                )) : platformSplit.map((p, i) => (
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

      {isLogoutModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsLogoutModalOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape" && !isLoggingOut) setIsLogoutModalOpen(false);
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            aria-describedby="logout-dialog-description"
            className="w-full max-w-md rounded-xl border border-panel-border bg-panel p-5 shadow-2xl sm:p-6"
          >
            <h2 id="logout-dialog-title" className="text-lg font-bold text-white">Log out?</h2>
            <p id="logout-dialog-description" className="mt-2 text-sm leading-6 text-muted">
              You’ll need to sign in again to access your saved links.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
              <button
                type="button"
                autoFocus
                disabled={isLoggingOut}
                onClick={() => setIsLogoutModalOpen(false)}
                className="rounded-lg border border-panel-border px-4 py-2.5 text-sm font-medium text-white transition hover:bg-dark disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={handleLogout}
                className="rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:cursor-wait disabled:opacity-60"
              >
                {isLoggingOut ? "Logging out..." : "Log Out"}
              </button>
            </div>
          </section>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl border border-panel-border bg-panel p-6">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Edit Username</h2>
                <p className="mt-1 text-sm text-muted">Update the username shown across your account.</p>
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