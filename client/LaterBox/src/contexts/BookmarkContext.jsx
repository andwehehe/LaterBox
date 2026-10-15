import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getBookmarks } from "../services/bookmarkService.js";
import { useUserContext } from "./UserContext.jsx";

const BookmarkContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useBookmarkContext = () => {
    return useContext(BookmarkContext);
}

function BookmarkProvider({ children }) {

    const [ bookmarks, setBookmarks ] = useState([]);
    const [ isBookmarkLoading, setIsBookmarkLoading ] = useState(true);
    const [ targetBookmark, setTargetBookmark ] = useState({});
    const [ bookmarkStatus, setBookmarkStatus ] = useState({ isSuccessful: false, message: "" });
    const [ suggestedMetadata, setSuggestedMetadata ] = useState({ 
        title: "", description: "", platform: "", thumbnail: "", icon: "" 
    });
    const { isUserLoading, userData } = useUserContext();

    const DEFAULT_BOOKMARK = {
        bookmark_id: "",
        title: "",
        url: "",
        note: "",
        saved_on: "",
        is_visited: false,
        is_starred: false,
        is_private:  false,
        tags: []
    }

    useEffect(() => {
        if (isUserLoading) return;

        if (!userData) {
            Promise.resolve().then(() => {
                setIsBookmarkLoading(false);
                setBookmarks([]);
            });
            return;
        }

        const controller = new AbortController();

        Promise.resolve().then(() => {
            if (!controller.signal.aborted) setIsBookmarkLoading(true);
        });

        (async () => {
            try {
                const data = await getBookmarks(controller.signal);
                if (!controller.signal.aborted) setBookmarks(data || []);
            } catch (err) {
                if (err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError' || controller.signal.aborted) return;
                if (!controller.signal.aborted) setBookmarks([]);
            } finally {
                if (!controller.signal.aborted) setIsBookmarkLoading(false);
            }
        })();

        return () => { controller.abort(); }
    }, [isUserLoading, userData]);

    const dashboardData = useMemo(() => {
        const stats = bookmarks.reduce((counts, bookmark) => ({
            total: counts.total + 1,
            favorites: counts.favorites + Number(bookmark.is_starred),
            visited: counts.visited + Number(bookmark.is_visited),
            unvisited: counts.unvisited + Number(!bookmark.is_visited)
        }), { total: 0, favorites: 0, visited: 0, unvisited: 0 });

        const recentSaves = [...bookmarks]
            .sort((first, second) => Date.parse(second.saved_on) - Date.parse(first.saved_on))
            .slice(0, 6)
            .map(({ bookmark_id, title, url, saved_on, is_visited, is_starred, metadata }) => ({
                bookmark_id,
                title,
                url,
                saved_on,
                is_visited,
                is_starred,
                platform: metadata?.platform || "Website"
            }));

        const platformCounts = bookmarks.reduce((counts, bookmark) => {
            const platform = bookmark.metadata?.platform || "Website";
            counts[platform] = (counts[platform] ?? 0) + 1;
            return counts;
        }, {});

        const topPlatforms = Object.entries(platformCounts)
            .sort(([, first], [, second]) => second - first)
            .slice(0, 3)
            .map(([name, count]) => ({
                name,
                count,
                percentage: Math.round((count / bookmarks.length) * 100)
            }));

        return {
            stats,
            latestSave: recentSaves[0] ?? null,
            topPlatform: topPlatforms[0] ?? null,
            topPlatforms,
            recentSaves
        };
    }, [bookmarks]);

    return(
        <BookmarkContext.Provider value={{ 
            bookmarks, 
            setBookmarks, 
            dashboardData,
            isBookmarkLoading,
            targetBookmark,
            setTargetBookmark,
            DEFAULT_BOOKMARK,
            bookmarkStatus,
            setBookmarkStatus,
            suggestedMetadata,
            setSuggestedMetadata
        }}>
            {children}
        </BookmarkContext.Provider>
    );
}

export default BookmarkProvider;