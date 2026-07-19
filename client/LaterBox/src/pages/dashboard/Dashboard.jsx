import { Search, Plus, Bell, Bookmark, ArrowUpRight, Clock, Layers } from "lucide-react";
import { MobileMenuButton, StatCard } from "../../components/ui.jsx";
import { useUserContext } from "../../contexts/UserContext.jsx";
import user2 from "../../assets/images/user-2.jpg";

import {
  dashboardStats,
  recentSaves,
  recentActivity,
  recommendedTags,
} from "./mockData.js";

const statIcons = [Bookmark, ArrowUpRight, Clock, Layers];

function Dashboard() {

  const { userData } = useUserContext();

  return (
    <div>
        {/* Top bar */}
        <header className="flex items-center gap-3 border-b border-panel-border px-4 py-4 sm:px-6">
          <MobileMenuButton />

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Search your library..."
            className="w-full rounded-lg border border-panel-border bg-panel py-2 pl-10 pr-3 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <button className="hidden items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light sm:flex">
          <Plus size={16} />
          Quick Add
        </button>
        <button
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-panel-border text-muted hover:text-white"
        >
          <Bell size={16} />
        </button>
        <div className="hidden items-center gap-2 md:flex">
          {user2 ? (
            <img
              src={user2}
              alt={userData.username}
              className="h-9 w-9 rounded-full"
            />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent-light">
              {/* {placeholder} */}
              PH
            </span>
          )}
          <div className="leading-tight">
            <p className="text-sm font-medium text-white">{userData.username}</p>
            <p className="text-xs text-muted">Id: {userData.id}</p>
          </div>
        </div>
      </header>

      <main className="space-y-6 p-4 sm:p-6">
        {/* Welcome banner + top platform */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl2 border border-panel-border bg-gradient-to-br from-accent to-[#241f6b] p-6 lg:col-span-2">
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white">
              Quick Save
            </span>
            <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Welcome back, {userData.username.split(" ")[0]}!
            </h1>
            <p className="mt-1 text-sm text-white/80">
              You've saved <span className="font-semibold text-white">12 new links</span> this
              week. Ready to add something else to your collection?
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                placeholder="Paste any link here to save instantly..."
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:outline-none"
              />
              <button className="shrink-0 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-dark transition hover:bg-white/90">
                Save
              </button>
            </div>
          </div>

          <div className="rounded-xl2 border border-panel-border bg-panel p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Top Platform</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
                🐦
              </span>
              <div>
                <p className="text-sm font-semibold text-white">X / Twitter</p>
                <p className="text-xs text-muted">42% of your library</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs text-muted">
                <span>Recent growth</span>
                <span className="text-accent-light">+12% this month</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-panel-border">
                <div className="h-1.5 w-[42%] rounded-full bg-sky-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {dashboardStats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} icon={statIcons[i]} />
          ))}
        </div>

        {/* Recent saves + activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent Saves</h2>
              <a href="#saved-links" className="text-sm font-medium text-accent-light hover:underline">
                View All →
              </a>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {recentSaves.map((item) => (
                <div key={item.title} className="rounded-xl2 border border-panel-border bg-panel p-4">
                  <p className="truncate text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 truncate text-xs text-muted">{item.url}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-dark px-2 py-0.5 text-[11px] font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="shrink-0 whitespace-nowrap text-[11px] text-muted">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-white">Recent Activity</h2>
            <div className="space-y-4 rounded-xl2 border border-panel-border bg-panel p-4">
              {recentActivity.map((item, i) => (
                <div key={item.title + i} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <div className="min-w-0">
                    <p className="text-sm text-white">
                      <span className="font-medium">{item.action}</span>{" "}
                      <span className="text-accent-light">{item.title}</span>
                    </p>
                    <p className="text-xs text-muted">
                      {item.detail} · {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl2 border border-panel-border bg-panel p-4">
              <p className="mb-3 text-sm font-semibold text-white">Recommended Tags</p>
              <p className="mb-3 text-xs text-muted">Based on your recent saves</p>
              <div className="flex flex-wrap gap-2">
                {recommendedTags.map((tag) => (
                  <button
                    key={tag}
                    className="rounded-full border border-panel-border px-3 py-1 text-xs font-medium text-muted transition hover:border-accent hover:text-white"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;