import { useState } from "react";
import { X, Link2, Type, FileText, Tag as TagIcon, CheckCircle2 } from "lucide-react";
import { TagChip } from "../../components/ui.jsx";
import { useBookmarkContext } from "../../contexts/BookmarkContext.jsx";
import { addBookmark } from "../../services/bookmarkService.js";

// Very small heuristic just to show a "detected platform" badge next to
// the URL field, matching the design. Extend this list as needed —
// it's just string matching, nothing fancy.
function detectPlatform(url) {
  if (!url) return null;
  if (url.includes("github.com")) return "GitHub";
  if (url.includes("youtube.com")) return "YouTube";
  if (url.includes("twitter.com") || url.includes("x.com")) return "X";
  return null;
}

function AddBookmarkModal({ isModalOpen, setIsModalOpen, setBookmarkStatus }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const { setBookmarks } = useBookmarkContext();
  const currentDate = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  if (!isModalOpen) return null;

  const platform = detectPlatform(url);

  const handleTagKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault(); // stop it from submitting the form

    const newTag = tagInput.trim();
    if (!newTag) return;
    if (tags.includes(newTag)) {
      setTagInput("");
      return; // no duplicates
    }

    setTags((prev) => [...prev, newTag]);
    setTagInput("");
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const resetForm = () => {
    setUrl("");
    setTitle("");
    setNote("");
    setTags([]);
    setTagInput("");
  };

  const onClose = () => {
    setIsModalOpen(false);
  }
  
  const onSave = ({ bookmark_id, title, url, platform, note, tags }) => {
    setBookmarks(prev => [...prev, { 
      bookmark_id, 
      title, 
      url, 
      platform, 
      note, 
      saved_at: currentDate,
      is_visited: false,
      is_starred: false,
      is_private:  false,
      tags: [...tags]
    }]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = await addBookmark(title, url, platform, note, tags);
    onSave({ bookmark_id: data.bookmark_id, title, url, platform, note, tags });
    setBookmarkStatus({ isAdded: true, message: data.message });
    resetForm();
    onClose();

    setTimeout(() => {
      setBookmarkStatus({isAdded: false, message: data.message });
    }, 3000)
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={handleCancel} // click on the backdrop closes it
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-panel-border bg-panel p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()} // don't let clicks inside the modal bubble to the backdrop
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Add Bookmark</h2>
            <p className="mt-1 text-sm text-muted">Save a link to your collection instantly.</p>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            aria-label="Close"
            className="text-muted hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* URL */}
          <div>
            <label htmlFor="bookmark-url" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-white">
              <Link2 size={14} />
              Bookmark URL
            </label>
            <div className="relative">
              <input
                id="bookmark-url"
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://github.com/shadcn-ui/ui"
                className="w-full rounded-lg border border-panel-border bg-dark/60 px-3 py-2.5 pr-28 text-sm text-white placeholder:text-muted/70 focus:border-accent focus:outline-none"
              />
              {platform && (
                <span className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-full bg-panel-border px-2.5 py-1 text-xs font-medium text-white">
                  <CheckCircle2 size={12} className="text-green-400" />
                  {platform}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="bookmark-title" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-white">
              <Type size={14} />
              Title
            </label>
            <input
              id="bookmark-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="shadcn/ui: Beautifully designed components"
              className="w-full rounded-lg border border-panel-border bg-dark/60 px-3 py-2.5 text-sm text-white placeholder:text-muted/70 focus:border-accent focus:outline-none"
            />
          </div>

          {/* Note */}
          <div>
            <label htmlFor="bookmark-note" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-white">
              <FileText size={14} />
              Why did you save this?
            </label>
            <textarea
              id="bookmark-note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Essential UI library for the new project. Reusable, accessible, and clean code."
              className="w-full resize-none rounded-lg border border-panel-border bg-dark/60 px-3 py-2.5 text-sm text-white placeholder:text-muted/70 focus:border-accent focus:outline-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="bookmark-tags" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-white">
              <TagIcon size={14} />
              Tags
            </label>
            <div className="flex min-h-[70px] flex-wrap items-start gap-2 rounded-lg border border-panel-border bg-dark/60 p-2.5">
              {tags.map((tag) => (
                <TagChip key={tag} onRemove={() => removeTag(tag)}>
                  {tag}
                </TagChip>
              ))}
              <input
                id="bookmark-tags"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={tags.length === 0 ? "Type tag and press Enter..." : ""}
                className="min-w-[120px] flex-1 bg-transparent text-sm text-white placeholder:text-muted/70 focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
            >
              Save Bookmark
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBookmarkModal