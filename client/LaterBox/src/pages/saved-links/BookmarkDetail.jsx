import {
  ChevronLeft,
  Search,
  Plus,
  ExternalLink,
  Copy,
  Calendar,
  CheckCircle2,
  Star,
  Pencil,
  Trash2,
  Globe,
  Share2,
} from "lucide-react";
import { MobileMenuButton } from "../../components/ui.jsx";
import { bookmarkDetail as bm, relatedBookmarks } from "../dashboard/mockData.js";

export default function BookmarkDetail() {
  return (
    <div>
      {/* Top bar */}
      <header className="flex items-center gap-3 border-b border-panel-border px-4 py-4 sm:px-6">
        <MobileMenuButton />

        <button
          aria-label="Back to Saved Links"
          className="hidden shrink-0 items-center gap-1 text-sm text-muted hover:text-white sm:flex"
        >
          <ChevronLeft size={16} />
        </button>
        <p className="hidden truncate text-sm text-muted sm:block">
          Saved Links / <span className="font-medium text-white">{bm.title.slice(0, 28)}…</span>
        </p>

        <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Search your library..."
            className="w-full rounded-lg border border-panel-border bg-panel py-2 pl-10 pr-3 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <button className="ml-auto flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light md:ml-0">
          <Plus size={16} />
          <span className="hidden sm:inline">Add New</span>
        </button>
      </header>

      <main className="p-4 sm:p-6">
        {/* Hero banner */}
        <div className="relative h-48 overflow-hidden rounded-t-xl2 border border-b-0 border-panel-border bg-gradient-to-br from-[#1c2340] via-[#2a1f4f] to-[#191927] sm:h-56">
          <div
            aria-hidden
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, rgba(139,133,247,0.35), transparent 55%), radial-gradient(circle at 70% 60%, rgba(91,82,240,0.3), transparent 50%)",
            }}
          />
        </div>

        {/* Title row */}
        <div className="flex flex-col gap-4 border border-t-0 border-panel-border bg-panel px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl">
              🎨
            </span>
            <div>
              <span className="mb-1 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-white">
                {bm.category}
              </span>
              <h1 className="text-lg font-bold text-white sm:text-xl">{bm.title}</h1>
            </div>
          </div>
          <a
            href={`https://${bm.originalUrl}`}
            className="flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-panel-border px-3 py-2 text-sm font-medium text-white hover:border-muted sm:self-center"
          >
            <ExternalLink size={14} />
            Visit Site
          </a>
        </div>

        {/* Meta row */}
        <div className="flex flex-col gap-4 rounded-b-xl2 border border-t-0 border-panel-border bg-panel px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <Copy size={13} />
              <span className="font-semibold uppercase tracking-wide">Original URL</span>
              <span className="text-white">{bm.originalUrl}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              <span className="font-semibold uppercase tracking-wide">Saved On</span>
              <span className="text-white">{bm.savedOn}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} />
              <span className="font-semibold uppercase tracking-wide">Status</span>
              <span className="text-white">{bm.status}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              aria-label="Starred"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-panel-border text-yellow-400"
            >
              <Star size={16} fill="currentColor" />
            </button>
            <button
              aria-label="Edit bookmark"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-panel-border text-muted hover:text-white"
            >
              <Pencil size={16} />
            </button>
            <button
              aria-label="Delete bookmark"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-panel-border text-muted hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Notes + sidebar */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-xl2 border border-panel-border bg-panel p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  Personal Notes
                </h2>
                <button className="text-sm font-medium text-accent-light hover:underline">Edit Notes</button>
              </div>

              <p className="text-sm leading-relaxed text-muted">{bm.notes}</p>

              <p className="mt-4 mb-2 text-sm font-semibold text-white">Key Points to Research Further:</p>
              <ul className="mb-4 space-y-2 text-sm text-muted">
                {bm.keyPoints.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                    {point}
                  </li>
                ))}
              </ul>

              <p className="text-sm leading-relaxed text-muted">{bm.followUp}</p>
            </div>

            {/* Web archive */}
            <div className="flex flex-col gap-3 rounded-xl2 border border-panel-border bg-panel p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent-light">
                  <Globe size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Web Archive Available</p>
                  <p className="text-xs text-muted">Snapshot taken at time of saving.</p>
                </div>
              </div>
              <button className="shrink-0 self-start rounded-lg border border-panel-border px-4 py-2 text-sm font-medium text-white hover:border-muted sm:self-auto">
                View Archive
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl2 border border-panel-border bg-panel p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Tags</p>
              <div className="flex flex-wrap gap-2">
                {bm.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-dark px-3 py-1 text-xs font-medium text-accent-light">
                    #{tag}
                  </span>
                ))}
                <button className="rounded-full border border-dashed border-panel-border px-3 py-1 text-xs font-medium text-muted hover:text-white">
                  + Add Tag
                </button>
              </div>
            </div>

            <div className="rounded-xl2 border border-panel-border bg-panel p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Platform Details</p>
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted">Source</dt>
                  <dd className="font-medium text-white">{bm.source}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted">Author</dt>
                  <dd className="font-medium text-white">{bm.author}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted">Reading Time</dt>
                  <dd className="font-medium text-white">{bm.readingTime}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted">Public</dt>
                  <dd>
                    <span className="rounded-full bg-panel-border px-2.5 py-0.5 text-xs font-medium text-white">
                      {bm.isPublic ? "Public" : "Private"}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl2 border border-accent/40 bg-accent/10 p-5">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-accent-light">
                <Star size={14} fill="currentColor" />
                Pro Tip
              </p>
              <p className="mb-4 text-sm text-muted">
                You can share this detailed view with your team by enabling "Public Access" in the settings toolbar.
              </p>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-light">
                <Share2 size={15} />
                Share Link
              </button>
            </div>
          </div>
        </div>

        {/* Related bookmarks */}
        <div className="mt-8">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Related Bookmarks</h2>
            <a href="#related" className="text-sm font-medium text-accent-light hover:underline">
              See all matches →
            </a>
          </div>
          <p className="mb-4 text-sm text-muted">
            Based on "{bm.tags[0]}" and "{bm.tags[3]}" tags
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {relatedBookmarks.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-xl2 border border-panel-border bg-panel">
                <div className="relative h-24 bg-gradient-to-br from-[#2c2c44] to-[#1a1a2b]">
                  <span className="absolute left-2 top-2 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">
                    {item.source}
                  </span>
                </div>
                <p className="p-3 text-xs font-medium leading-snug text-white">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>

  );
}
