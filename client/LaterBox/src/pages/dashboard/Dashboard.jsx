import { useEffect, useState } from "react";
import {
  Bookmark,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Globe2,
  Star,
} from "lucide-react";
import { StatCard } from "../../components/components.jsx";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { getDashboardData } from "../../services/bookmarkService.js";

const emptyDashboard = {
  stats: { total: 0, favorites: 0, visited: 0, unvisited: 0 },
  latestSave: null,
  topPlatform: null,
  recentSaves: [],
};

const statIcons = [Bookmark, Star, CheckCircle2, CircleDashed];

function Dashboard() {
  const { userData } = useUserContext();
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!userData) return;

    const controller = new AbortController();

    const loadDashboard = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        setDashboard(await getDashboardData(controller.signal));
      } catch {
        if (!controller.signal.aborted) setHasError(true);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadDashboard();
    return () => controller.abort();
  }, [userData]);

  const stats = [
    { label: "Total Bookmarks", value: dashboard.stats.total, delta: "Saved links" },
    { label: "Favorites", value: dashboard.stats.favorites, delta: "Starred links" },
    { label: "Visited", value: dashboard.stats.visited, delta: "Opened links" },
    { label: "Unvisited", value: dashboard.stats.unvisited, delta: "Waiting to explore" },
  ];
  const firstName = userData?.username?.split(" ")[0] ?? "there";

  return (
    <div>
      <main className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <section className="rounded-lg border border-white/15 bg-gradient-to-br from-accent to-[#241f6b] p-6 lg:col-span-2">
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
              Your library
            </span>
            <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Welcome back, {firstName}.
            </h1>
            <p className="mt-1 text-sm text-white/80">
              You have <span className="font-semibold text-white">{dashboard.stats.total} saved links</span> in your collection.
            </p>
            <a
              href="#saved-links"
              className="mt-4 inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-dark transition hover:bg-white/90"
            >
              Browse saved links
            </a>
          </section>

          <section className="rounded-lg border border-panel-border bg-panel p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Top platform</p>
            {dashboard.topPlatform ? (
              <>
                <div className="mt-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
                    <Globe2 size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{dashboard.topPlatform.name}</p>
                    <p className="text-xs text-muted">{dashboard.topPlatform.percentage}% of your library</p>
                  </div>
                </div>
                <div className="mt-4 h-1.5 w-full rounded-full bg-panel-border">
                  <div className="h-1.5 rounded-full bg-sky-400" style={{ width: `${dashboard.topPlatform.percentage}%` }} />
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-muted">Save a link to see platform insights.</p>
            )}
          </section>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} icon={statIcons[index]} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-white">Recent saves</h2>
              <a href="#saved-links" className="text-sm font-medium text-accent-light hover:underline">View all</a>
            </div>
            {isLoading && <p className="text-sm text-muted">Loading your latest saves...</p>}
            {hasError && <p className="text-sm text-red-300">Could not load dashboard data.</p>}
            {!isLoading && !hasError && dashboard.recentSaves.length === 0 && (
              <p className="rounded-lg border border-dashed border-panel-border p-5 text-sm text-muted">No bookmarks saved yet.</p>
            )}
            {!isLoading && !hasError && dashboard.recentSaves.length > 0 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {dashboard.recentSaves.map((item) => (
                  <article key={item.bookmark_id} className="rounded-lg border border-panel-border bg-panel p-4">
                    <p className="truncate text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 truncate text-xs text-muted">{item.url}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => <span key={tag} className="rounded-md bg-dark px-2 py-0.5 text-[11px] font-medium text-muted">{tag}</span>)}
                      </div>
                      <span className="flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px] text-muted"><Clock3 size={12} />{item.saved_on}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">Latest save</h2>
            <div className="rounded-lg border border-panel-border bg-panel p-4">
              {dashboard.latestSave ? (
                <>
                  <p className="truncate text-sm font-semibold text-white">{dashboard.latestSave.title}</p>
                  <p className="mt-1 text-xs text-muted">Saved {dashboard.latestSave.saved_on}</p>
                  <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                    <span className={`h-2 w-2 rounded-full ${dashboard.latestSave.is_visited ? "bg-emerald-400" : "bg-amber-400"}`} />
                    {dashboard.latestSave.is_visited ? "Visited" : "Unvisited"}
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted">Your latest bookmark will appear here.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
