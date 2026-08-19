import { useState, useEffect, useRef } from "react";
import { X, Link2, Type, FileText, Tag as TagIcon } from "lucide-react";
import { TagChip } from "../../components/components.jsx";
import { useBookmarkContext } from "../../contexts/BookmarkContext.jsx";
import { addBookmark, fetchDetailsSuggestion } from "../../services/bookmarkService.js";

function AddBookmarkModal({ isModalOpen, setIsModalOpen, setBookmarkStatus }) {

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const { setBookmarks } = useBookmarkContext();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestion, setSuggestion] = useState({ title: "", description: "" });
  const [titleSuggested, setTitleSuggested] = useState(false);
  const [descriptionSuggested, setDescriptionSuggested] = useState(false);

  // Suggest details when URL changes (debounced)
  const lastRequestedUrlRef = useRef(null);

  useEffect(() => {
    if (!url) {
      lastRequestedUrlRef.current = null;
      return;
    }

    if (lastRequestedUrlRef.current === url) return;

    lastRequestedUrlRef.current = url;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        setIsSuggesting(true);
        setSuggestion({ title: "", description: "" });
        const data = await fetchDetailsSuggestion(url, controller.signal);

        if (controller.signal.aborted) return;

        setSuggestion({ title: data.title || "", description: data.description || "" });

        if (!title && data.title) {
          setTitleSuggested(true);
        }

        if (!note && data.description) {
          setDescriptionSuggested(true);
        }

      } catch (err) {
        if (err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError') return;
        console.error(err);
      } finally {
        if (!controller.signal.aborted) setIsSuggesting(false);
      }
    }, 700);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [url, title, note]);

  if (!isModalOpen) return null;

  const handleTagKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const newTag = tagInput.trim();
    if (!newTag) return;
    if (tags.includes(newTag)) {
      setTagInput("");
      return;
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
  
  const onSave = ({ bookmark_id, title, url, note, tags, saved_on }) => {
    setBookmarks(prev => [...prev, { 
      bookmark_id, 
      title, 
      url, 
      note, 
      saved_on,
      is_visited: false,
      is_starred: false,
      is_private:  false,
      tags: [...tags]
    }]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = await addBookmark(title, url, note, tags);
    onSave({ bookmark_id: data.bookmark_id, title, url, note, tags, saved_on: data.saved_on });
    setBookmarkStatus({ isSuccessful: true, message: data.message });
    resetForm();
    onClose();

    setTimeout(() => {
      setBookmarkStatus({isAdded: false, message: data.message });
    }, 3000)
  };

  const applyTitleSuggestion = () => {
    if (suggestion.title) {
      setTitle(suggestion.title);
      setTitleSuggested(false);
    }
  }

  const applyDescriptionSuggestion = () => {
    if (suggestion.description) {
      setNote(suggestion.description);
      setDescriptionSuggested(false);
    }
  }

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"  
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-panel-border bg-panel p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
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
                placeholder="Enter a URL to save"
                className="w-full rounded-lg border border-panel-border bg-dark/60 px-3 py-2.5 pr-28 text-sm text-white placeholder:text-muted/70 focus:border-accent focus:outline-none"
              />
              {isSuggesting && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin text-muted" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  <span className="text-xs text-muted">Suggesting...</span>
                </div>
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
              onChange={(e) => { 
                const val = e.target.value;
                setTitle(val);

                if (val === "" && suggestion.title) {
                  setTitleSuggested(true);
                } else {
                  setTitleSuggested(false);
                } 
              }}
              placeholder={title || (titleSuggested && suggestion.title) || "Enter a title for your bookmark"}
              className={`w-full rounded-lg border border-panel-border bg-dark/60 px-3 py-2.5 text-sm text-white placeholder:text-muted/70 focus:border-accent focus:outline-none ${titleSuggested && !title ? 'opacity-60' : ''}`}
            />
            {suggestion.title && !isSuggesting && !title && (
              <div className="mt-1 flex items-center justify-end">
                <button type="button" onClick={applyTitleSuggestion} className="text-xs text-accent underline">Apply title</button>
              </div>
            )}
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
              onChange={(e) => {
                const val = e.target.value;
                setNote(val);

                if (val === "" && suggestion.description) {
                  setDescriptionSuggested(true);
                } else {
                  setDescriptionSuggested(false);
                }
              }}
              placeholder={note || (descriptionSuggested && suggestion.description) || "Describe why you saved this link..."}
              className={`w-full resize-none rounded-lg border border-panel-border bg-dark/60 px-3 py-2.5 text-sm text-white placeholder:text-muted/70 focus:border-accent focus:outline-none ${descriptionSuggested && !note ? 'opacity-60' : ''}`}
            />
            {suggestion.description && !isSuggesting && !note && (
              <div className="mt-1 flex items-center justify-end">
                <button type="button" onClick={applyDescriptionSuggestion} className="text-xs text-accent underline">Apply description</button>
              </div>
            )}
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