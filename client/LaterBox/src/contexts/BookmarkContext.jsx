import { createContext, useContext, useState, useEffect } from "react";
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

    return(
        <BookmarkContext.Provider value={{ 
            bookmarks, 
            setBookmarks, 
            isBookmarkLoading,
            targetBookmark,
            setTargetBookmark,
            DEFAULT_BOOKMARK,
            bookmarkStatus,
            setBookmarkStatus
        }}>
            {children}
        </BookmarkContext.Provider>
    );
}

export default BookmarkProvider;