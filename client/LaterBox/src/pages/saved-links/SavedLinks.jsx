import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Plus, ChevronDown, Star, Video,
  Code2, MessageCircle, FileText, Lock,
  ExternalLink, Clock,
} from "lucide-react";
import { MobileMenuButton } from "../../components/ui.jsx";
// import { bookmarks } from "../dashboard/mockData";
import user2 from "../../assets/images/user-2.jpg";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useBookmarkContext } from "../../contexts/BookmarkContext.jsx";
import AddBookmarkModal from "./AddBookmarkModal.jsx";
import { PopupMessage } from "../../components/ui.jsx";

// Maps each bookmark's platform string to an icon + accent color,
// so adding a new platform later is a one-line change here.
// Note: lucide-react no longer ships brand/logo icons (no Youtube,
// Github, Twitter, etc.) — these are generic stand-ins instead.
const platformMeta = {
  YouTube: { icon: Video, color: "text-red-400" },
  Article: { icon: FileText, color: "text-sky-400" },
  GitHub: { icon: Code2, color: "text-white" },
  Twitter: { icon: MessageCircle, color: "text-sky-300" },
};

const filterOptions = ["All Links", "Unvisited", "Favorites", "YouTube", "GitHub", "Twitter"];

export default function SavedLinks() {
  const [activeFilter, setActiveFilter] = useState("All Links");
  const [query, setQuery] = useState("");
  const [bookmarkStatus, setBookmarkStatus] = useState({ isAdded: false, message: "Unsuccessful" });

  const navigate = useNavigate();

  const { userData } = useUserContext();
  const { bookmarks, setTargetBookmark } = useBookmarkContext();
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const filtered = useMemo(() => {
    return bookmarks.filter((b) => {
      const matchesQuery =
        !query ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchesFilter =
        activeFilter === "All Links" ||
        (activeFilter === "Unvisited" && !b.is_visited) ||
        (activeFilter === "Favorites" && b.is_starred) ||
        b.platform === activeFilter;

      return matchesQuery && matchesFilter;
    });
  }, [bookmarks, query, activeFilter]);

  const navigateToMoreDetails = (bookmark_id) => {
    const [targetBookmark] = bookmarks.filter(bookmark => {
      return bookmark.bookmark_id === bookmark_id;
    });

    setTargetBookmark(prev => ({...prev, ...targetBookmark}));
    navigate(`/saved-links/${targetBookmark.title.replaceAll(" ", "-")}`);
  };

  return (
    <div>
      {/* Top bar */}
      <header className="flex items-center gap-3 border-b border-panel-border px-4 py-4 sm:px-6">
        <MobileMenuButton />

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bookmarks, tags, or notes..."
            className="w-full rounded-lg border border-panel-border bg-panel py-2 pl-10 pr-3 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light">
          <Plus size={16} />
          <span className="hidden sm:inline">Add Bookmark</span>
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
        </div>
      </header>

      <main className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Saved Links</h1>
            <p className="mt-1 text-sm text-muted">Manage and discover your digital archive.</p>
          </div>
          <button className="flex items-center gap-2 self-start rounded-lg border border-panel-border px-3 py-2 text-sm text-muted hover:text-white sm:self-auto">
            Sort by: <span className="font-medium text-white">Recently Added</span>
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Filter chips */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {filterOptions.map((label) => (
            <button
              key={label}
              onClick={() => setActiveFilter(label)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                activeFilter === label
                  ? "bg-accent text-white"
                  : "border border-panel-border text-muted hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
          <button className="rounded-full border border-dashed border-panel-border px-3 py-1.5 text-xs font-medium text-muted hover:text-white">
            + Add Tag
          </button>
        </div>

        {/* Bookmark grid */}
        <div className="grid grid-cols-1 gap-5 auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => {
            const meta = platformMeta[b.platform] ?? { icon: FileText, color: "text-muted" };
            const Icon = meta.icon;
            return (
              <article
                key={b.bookmark_id}
                className="flex h-full flex-col overflow-hidden rounded-xl2 border border-panel-border bg-panel transition hover:border-accent/50"
                onClick={() => navigateToMoreDetails(b.bookmark_id)}
              >
                {/* Thumbnail */}
                <div className="relative h-36 bg-gradient-to-br from-[#2c2c44] to-[#1a1a2b]">
                  <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white">
                    <Icon size={13} className={meta.color} />
                    {b.platform}
                  </span>
                  <button
                    aria-label={b.is_starred ? "Unstar bookmark" : "Star bookmark"}
                    className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white text-yellow-400"
                  >
                    <Star size={14} fill={b.is_starred ? "currentColor" : "none"} />
                  </button>
                </div>

                <div className="flex grow flex-col p-4">
                  <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-white">{b.title}</h3>
                  <p className="mb-2 flex items-center gap-1 truncate text-xs text-muted">
                    <ExternalLink size={11} className="shrink-0" />
                    {b.url}
                  </p>
                  <p className="bookmark-description mb-3 text-xs italic text-muted">"{b.note}"</p>

                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {b.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-dark px-2 py-0.5 text-[11px] font-medium text-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between text-[11px] text-muted">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {b.saved_on}
                    </span>
                    <span className="flex items-center gap-1.5">
                      {b.is_visited ? "Visited" : "Unvisited"}
                      {b.is_private && <Lock size={11} />}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Add-new tile */}
          <button className="
            flex min-h-[220px] flex-col items-center justify-center 
            gap-2 rounded-xl2 border border-dashed border-panel-border 
            bg-panel/40 p-6 text-center transition hover:border-accent"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-panel-border text-white">
              <Plus size={18} />
            </span>
            <p className="text-sm font-semibold text-white">Save New Link</p>
            <p className="text-xs text-muted">Click here to add another resource to your collection.</p>
            <span className="mt-1 rounded-md border border-panel-border px-2 py-1 text-[11px] text-muted">
              Shortcut: Alt + N
            </span>
          </button> 
        </div>
      </main>

      {isModalOpen && 
        <AddBookmarkModal 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen} 
          setBookmarkStatus={setBookmarkStatus}
        />
      }

      <PopupMessage 
        isSuccessful={bookmarkStatus.isAdded}
        message={bookmarkStatus.message}
      />
    </div>
  );
}
