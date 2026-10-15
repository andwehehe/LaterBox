import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Globe2,
  Star,
} from "lucide-react";
import { StatCard } from "../../components/components.jsx";
import { useBookmarkContext } from "../../contexts/BookmarkContext.jsx";
import { useUserContext } from "../../contexts/UserContext.jsx";

const statIcons = [Bookmark, Star, CheckCircle2, CircleDashed];

function Dashboard() {
  const navigate = useNavigate();
  const { userData, isUserLoading } = useUserContext();
  const {
    bookmarks,
    setTargetBookmark,
    dashboardData: dashboard,
    isBookmarkLoading
  } = useBookmarkContext();

  const stats = [
    { label: "Total Bookmarks", value: dashboard.stats.total, delta: "Saved links" },
    { label: "Favorites", value: dashboard.stats.favorites, delta: "Starred links" },
    { label: "Visited", value: dashboard.stats.visited, delta: "Opened links" },
    { label: "Unvisited", value: dashboard.stats.unvisited, delta: "Waiting to explore" },
  ];

  const openSavedLinks = () => navigate("/saved-links");

  const openBookmarkDetails = (bookmarkId) => {
    const targetBookmark = bookmarks.find((bookmark) => bookmark.bookmark_id === bookmarkId);

    if (!targetBookmark) {
      navigate("/saved-links");
      return;
    }

    setTargetBookmark((prev) => ({ ...prev, ...targetBookmark }));
    navigate(`/saved-links/${targetBookmark.bookmark_id}/${targetBookmark.title.replaceAll(" ", "-")}`);
  };

  const isLoading = isUserLoading || isBookmarkLoading;
  const firstName = userData?.username?.split(" ")[0] ?? "there";

  return (
    <div>
      <main className="space-y-6 p-4 sm:p-6" aria-busy={isLoading}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <section className="flex flex-col rounded-lg border border-white/15 bg-gradient-to-br from-accent to-[#241f6b] p-6 lg:col-span-2">
            {isLoading ? (
              <div className="mt-4 animate-pulse space-y-3" aria-hidden="true">
                <div className="h-8 w-64 max-w-full rounded bg-white/20" />
                <div className="h-4 w-72 max-w-full rounded bg-white/20" />
              </div>
            ) : (
              <>
                <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                  Welcome back, {firstName}.
                </h1>
                <p className="mt-1 text-sm text-white/80">
                  You have <span className="font-semibold text-white">{dashboard.stats.total} saved links</span> in your collection.
                </p>
              </>
            )}
            <button
              type="button"
              onClick={openSavedLinks}
              className="mt-6 inline-flex self-start rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-dark transition hover:bg-white/90"
            >
              Browse saved links
            </button>
          </section>

          <section className="flex flex-col">
            <h2 className="mb-3 text-lg font-semibold text-white">Latest save</h2>
            {isBookmarkLoading ? (
              <div className="flex flex-1 animate-pulse flex-col rounded-lg border border-panel-border bg-panel p-4" aria-hidden="true">
                <div className="h-4 w-2/3 rounded bg-panel-border" />
                <div className="mt-2 h-3 w-20 rounded bg-panel-border" />
                <div className="mt-4 h-3 w-full rounded bg-panel-border" />
                <div className="mt-auto flex justify-between pt-6">
                  <div className="h-3 w-28 rounded bg-panel-border" />
                  <div className="h-3 w-16 rounded bg-panel-border" />
                </div>
              </div>
            ) : <button
              type="button"
              onClick={() => dashboard.latestSave && openBookmarkDetails(dashboard.latestSave.bookmark_id)}
              className="flex w-full flex-1 flex-col rounded-lg border border-panel-border bg-panel p-4 text-left transition hover:border-accent/60 hover:bg-panel/90 disabled:cursor-default disabled:hover:border-panel-border disabled:hover:bg-panel"
              disabled={!dashboard.latestSave}
            >
              {dashboard.latestSave ? (
                <>
                  <p className="truncate text-sm font-semibold text-white">{dashboard.latestSave.title}</p>
                  <p className="mt-1 text-xs text-sky-300">{dashboard.latestSave.platform}</p>
                  <p className="mt-4 truncate text-xs text-muted" title={dashboard.latestSave.url}>{dashboard.latestSave.url}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <span className="truncate text-xs text-muted">Saved {dashboard.latestSave.saved_on}</span>
                    <span className="flex shrink-0 items-center gap-2 text-xs text-muted">
                      <span className={`h-2 w-2 rounded-full ${dashboard.latestSave.is_visited ? "bg-emerald-400" : "bg-amber-400"}`} />
                      {dashboard.latestSave.is_visited ? "Visited" : "Unvisited"}
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted">Your latest bookmark will appear here.</p>
              )}
            </button>}
          </section>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {isLoading ? Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-[132px] animate-pulse rounded-xl2 border border-panel-border bg-panel p-5" aria-hidden="true">
              <div className="flex items-center justify-between">
                <div className="h-4 w-28 rounded bg-panel-border" />
                <div className="h-8 w-8 rounded-lg bg-panel-border" />
              </div>
              <div className="mt-3 h-8 w-16 rounded bg-panel-border" />
              <div className="mt-2 h-3 w-20 rounded bg-panel-border" />
            </div>
          )) : stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} icon={statIcons[index]} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">Recent saves</h2>
              <button type="button" onClick={openSavedLinks} className="text-sm font-medium text-accent-light hover:underline">
                View all
              </button>
            </div>
            {isBookmarkLoading ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2" aria-hidden="true">
                {Array.from({ length: 6 }, (_, index) => (
                  <div key={index} className="h-[88px] animate-pulse rounded-lg border border-panel-border bg-panel p-3">
                    <div className="h-4 w-2/3 rounded bg-panel-border" />
                    <div className="mt-3 h-3 w-full rounded bg-panel-border" />
                  </div>
                ))}
              </div>
            ) : dashboard.recentSaves.length ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {dashboard.recentSaves.slice(0, 6).map((item) => (
                  <button
                    key={item.bookmark_id}
                    type="button"
                    onClick={() => openBookmarkDetails(item.bookmark_id)}
                    className="h-full min-h-[88px] w-full rounded-lg border border-panel-border bg-panel p-3 text-left transition hover:border-accent/60 hover:bg-panel/90"
                  >
                    <p className="truncate text-sm font-semibold text-white">{item.title}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-xs text-muted">{item.platform}</span>
                      <span className="flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px] text-muted">
                        <Clock3 size={12} />{item.saved_on}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-dashed border-panel-border p-4 text-sm text-muted">No bookmarks saved yet.</p>
            )}
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">Top platforms</h2>
            <div className="rounded-lg border border-panel-border bg-panel p-4">
              {isLoading ? (
                <div className="grid animate-pulse grid-cols-1 gap-4" aria-hidden="true">
                  {[0, 1, 2].map((rank) => (
                    <div key={rank} className={rank === 0 ? "space-y-3 border-b border-panel-border pb-4" : "space-y-3"}>
                      <div className="h-5 w-1/2 rounded bg-panel-border" />
                      <div className={`${rank === 0 ? "h-2" : "h-1"} rounded-full bg-panel-border`} />
                    </div>
                  ))}
                </div>
              ) : dashboard.topPlatforms.length ? (
                <div className="grid grid-cols-1 gap-4">
                  {dashboard.topPlatforms.map((platform, index) => (
                    <div key={platform.name} className={index === 0 ? "border-b border-panel-border pb-4" : "pt-1"}>
                      <div className="mb-2 flex items-center gap-3">
                        <span className={`flex shrink-0 items-center justify-center rounded-lg ${index === 0 ? "h-10 w-10 bg-sky-500/20 text-sky-400" : "h-7 w-7 bg-sky-500/10 text-sky-400/75"}`}>
                          <Globe2 size={index === 0 ? 19 : 14} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className={`${index === 0 ? "text-base font-semibold" : "text-sm font-medium"} truncate text-white`}>
                            <span className="mr-1.5 text-muted">{index + 1}.</span>{platform.name}
                          </p>
                          <p className="text-[11px] text-muted">{platform.count} {platform.count === 1 ? "save" : "saves"}</p>
                        </div>
                        <span className={`${index === 0 ? "text-sm font-semibold" : "text-xs font-medium"} shrink-0 text-white`}>
                          {platform.percentage}%
                        </span>
                      </div>
                      <div className={`${index === 0 ? "h-2" : "h-1"} w-full rounded-full bg-panel-border`}>
                        <div
                          className={`${index === 0 ? "h-2" : "h-1"} rounded-full bg-sky-400`}
                          style={{ width: `${platform.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted">Save a link to see platform insights.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
