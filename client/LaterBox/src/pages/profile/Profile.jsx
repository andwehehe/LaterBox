import {
  Plus, Bookmark,
  Zap, Star, ExternalLink,
  Pencil, Calendar, ChevronRight,
} from "lucide-react";
import { MobileMenuButton, StatCard } from "../../components/components.jsx";
import {
  currentUser,
  profileStats,
  profileActivity,
  topCollections,
  platformSplit,
} from "../dashboard/mockData.js";

const statIcons = [Bookmark, Zap, Star];

const collectionColors = {
  D: "bg-violet-500/20 text-violet-300",
  C: "bg-sky-500/20 text-sky-300",
  R: "bg-orange-500/20 text-orange-300",
  W: "bg-emerald-500/20 text-emerald-300",
};

const barColors = ["bg-accent", "bg-sky-400", "bg-orange-400"];

function Profile() {
  return (
    <div>
      {/* Top bar */}
      <header className="flex items-center gap-3 border-b border-panel-border px-4 py-4 sm:px-6">
        <MobileMenuButton />

        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Profile Overview
        </p>

        <button className="ml-auto flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light">
          <Plus size={16} />
          <span className="hidden sm:inline">Quick Save</span>
        </button>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent-light">
          {currentUser.avatarInitials}
        </span>
      </header>

      <main className="space-y-6 p-4 sm:p-6">
        {/* Profile card */}
        <div className="flex flex-col gap-5 rounded-xl2 border border-panel-border bg-panel p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xl font-semibold text-accent-light">
              {currentUser.avatarInitials}
            </span>
            <div>
              <h1 className="text-xl font-bold text-white sm:text-2xl">{currentUser.name}</h1>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                <span>{currentUser.email}</span>
                <span className="text-panel-border">•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  Joined March 2023
                </span>
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-panel-border px-4 py-2 text-sm font-medium text-white hover:border-muted">
              <ExternalLink size={14} />
              Public Profile
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light">
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
              <a href="#activity" className="text-sm font-medium text-accent-light hover:underline">
                View All
              </a>
            </div>
            <div className="divide-y divide-panel-border rounded-xl2 border border-panel-border bg-panel">
              {profileActivity.map((item, i) => (
                <div key={item.title + i} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {item.action} • {item.time} •{" "}
                      <span className="rounded-md bg-dark px-1.5 py-0.5 text-[11px] text-muted">
                        {item.source}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: Top Collections + Platform Split */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-white">Top Collections</h2>
              <div className="space-y-2 rounded-xl2 border border-panel-border bg-panel p-3">
                {topCollections.map((col) => (
                  <div
                    key={col.name}
                    className="flex items-center justify-between gap-3 rounded-lg p-2 hover:bg-dark/60"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                          collectionColors[col.letter] ?? "bg-panel-border text-white"
                        }`}
                      >
                        {col.letter}
                      </span>
                      <span className="truncate text-sm font-medium text-white">{col.name}</span>
                    </div>
                    <span className="shrink-0 text-xs text-muted">{col.count} items</span>
                  </div>
                ))}
                <button className="flex w-full items-center justify-center gap-1 rounded-lg border border-panel-border py-2 text-sm font-medium text-muted hover:text-white">
                  Browse all collections
                  <ChevronRight size={14} />
                </button>
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
    </div>
  );
}

export default Profile;