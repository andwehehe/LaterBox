import {
  Search, Plus, Star, Video,
  Code2, MessageCircle, FileText, Lock,
  ExternalLink, Clock
} from "lucide-react";

import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa"

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useBookmarkContext } from "../../contexts/BookmarkContext.jsx";
import AddBookmarkModal from "./AddBookmarkModal.jsx";
import { PopupMessage } from "../../components/components.jsx";
import CardSkeleton from "../../shared/CardSkeleton.jsx";

const platformMeta = {
  YouTube: { icon: Video, color: "text-red-400" },
  Article: { icon: FileText, color: "text-sky-400" },
  GitHub: { icon: Code2, color: "text-white" },
  Twitter: { icon: MessageCircle, color: "text-sky-300" },
  Facebook: { icon: FaFacebook, color: "text-blue-500" },
  Instagram: { icon: FaInstagram, color: "text-pink-400" },
  Tiktok: { icon: FaTiktok, color: "text-cyan-300" }
};

const filterOptions = ["All Links", "Unvisited", "Favorites"];

export default function SavedLinks() {
  const [ activeFilter, setActiveFilter ] = useState("All Links");
  const [ query, setQuery ] = useState("");
  const { 
    bookmarks, setTargetBookmark, 
    bookmarkStatus, setBookmarkStatus, 
    isBookmarkLoading, 
  } = useBookmarkContext();
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return bookmarks.filter((b) => {
      const matchesQuery =
        !query ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchesFilter =
        activeFilter === "All Links" ||
        (activeFilter === "Unvisited" && !b.is_visited) ||
        (activeFilter === "Favorites" && b.is_starred) ||
        b.metadata?.platform === activeFilter;

      return matchesQuery && matchesFilter;
    });
  }, [bookmarks, query, activeFilter]);

  // can be in utils
  const navigateToMoreDetails = (bookmark_id) => {
    const targetBookmark = bookmarks.find(bookmark => {
      return bookmark.bookmark_id === bookmark_id;
    });

    if (!targetBookmark) return;

    setTargetBookmark(prev => ({...prev, ...targetBookmark}));
    navigate(`/saved-links/${targetBookmark.bookmark_id}/${targetBookmark.title.replaceAll(" ", "-")}`);
  };

  return (
    <div>
      <header className="relative overflow-hidden border-b border-panel-border bg-gradient-to-br from-[#19192d] via-panel to-dark px-4 py-7 sm:px-6 sm:py-5">
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Saved Links
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              Keep the ideas, tools, and references worth coming back to.
            </p>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6">
        <div className="mb-8 grid min-w-0 gap-4 md:grid-cols-[max-content_minmax(0,1fr)] md:items-end lg:gap-5">
          <div className="grid min-w-0 gap-3 sm:flex sm:items-center md:w-max">
            <label htmlFor="saved-links-search" className="relative block w-full min-w-0 sm:w-fit">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
              <input
                id="saved-links-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bookmarks, tags, or notes..."
                size="30"
                style={{ fieldSizing: "content" }}
                className="w-full min-w-0 rounded-lg border border-panel-border bg-panel py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40 sm:w-auto sm:min-w-[16rem] sm:max-w-[28rem]"
              />
            </label>

            <button 
              className="
                flex w-full items-center justify-center gap-2 rounded-lg 
                bg-accent px-4 py-2.5 text-sm font-semibold text-white transition
                whitespace-nowrap sm:w-auto
                hover:bg-accent-light
              "
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={16} />
              <span>Add New Link</span>
            </button>
          </div>

          <div className="flex min-w-0 flex-wrap items-center gap-2 rounded-lg border border-panel-border bg-panel/50 p-2 sm:w-max sm:max-w-full sm:flex-nowrap md:justify-self-end">
            <span className="whitespace-nowrap px-1 text-xs font-medium text-muted">Filters</span>
            <div className="flex min-w-0 flex-1 flex-wrap gap-2 sm:flex-nowrap">
              {filterOptions.map((label) => (
                <button
                  key={label}
                  onClick={() => setActiveFilter(label)}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    activeFilter === label
                      ? "bg-accent text-white"
                      : "border border-panel-border text-muted hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookmark grid */}
        <div className="grid grid-cols-1 gap-5 auto-rows-fr sm:grid-cols-2 xl:grid-cols-3">
          {isBookmarkLoading ? (
            <CardSkeleton instance={5} />
          ) : (
            filtered.map((b) => {
              const rawPlatform = b.metadata?.platform ?? "";
              const platform = rawPlatform.charAt(0).toUpperCase() + rawPlatform.slice(1);
              const meta = platformMeta[platform] ?? {
                icon: FileText,
                color: "text-muted"
              };

              const Icon = meta.icon;

              return (
                <article
                  key={b.bookmark_id}
                  className="
                    flex h-full flex-col overflow-hidden rounded-xl2 border
                    border-panel-border bg-panel transition hover:border-accent/50
                  "
                  onClick={() => navigateToMoreDetails(b.bookmark_id)}
                >
                  {/* Thumbnail */}
                  <div className="
                    relative h-36 bg-gradient-to-br from-[#2c2c44] to-[#1a1a2b] 
                    flex items-center justify-center
                  ">
                    <span className="
                      absolute left-3 top-3 flex items-center gap-1.5 rounded-md
                      bg-black/50 px-2 py-1 text-xs font-medium text-white
                    ">
                      <Icon size={13} className={meta.color} />
                      {b.metadata?.platform || "Website"}
                    </span>

                    <span
                      className={`
                        absolute right-3 top-3 flex h-7 w-7 items-center justify-center
                        rounded-full bg-black/50 text-white
                        ${b.is_starred && "text-yellow-400"}
                      `}
                    >
                      <Star
                        size={14}
                        fill={b.is_starred ? "currentColor" : "none"}
                      />
                    </span>

                    {b.metadata?.thumbnail 
                      && <img
                          src={b.metadata?.thumbnail}
                          alt="thumbnail"
                          className="h-full w-full object-cover object-top"
                        />
                    }
                    
                  </div>

                  <div className="flex grow flex-col p-4">
                    <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-white">
                      {b.title}
                    </h3>

                    <p className="bookmark-url mb-2 flex items-center gap-1 truncate text-xs text-muted">
                      <ExternalLink size={11} className="shrink-0" />
                      {b.url}
                    </p>

                    <p className="bookmark-description mb-3 text-xs italic text-muted">
                      "{b.note}"
                    </p>

                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {b.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-dark px-2 py-0.5 text-[11px] font-medium text-muted"
                        >
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
            })
          )}

          {/* Add-new bookmark */}
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
        isSuccessful={bookmarkStatus.isSuccessful}
        message={bookmarkStatus.message}
      />
    </div>
  );
}
