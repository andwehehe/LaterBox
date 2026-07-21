import { createContext, useContext, useState, useEffect } from "react";
import { getBookmarks } from "../services/bookmarkService.js";
import { useUserContext } from "./UserContext.jsx";

const BookmarkContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useBookmarkContext = () => {
    return useContext(BookmarkContext);
}

function BookmarkProvider({ children }) {

    const [ bookmarks, setBookmarks ] = useState([])
    const [ isBookmarkLoading, setIsBookmarkLoading ] = useState(true);
    const { isUserLoading, userData } = useUserContext();

    // {
    //     bookmark_id: "",
    //     title: "",
    //     url: "",
    //     platform: "",
    //     note: "",
    //     saved_at: "",
    //     is_visited: false,
    //     is_starred: false,
    //     is_private:  false,
    //     tags: []
    // }

    useEffect(() => {
        if(isUserLoading) return;
        if(!userData) return;

        const fetchBookmarks = async () => {
            try {
                const data = await getBookmarks();
                setBookmarks(data);
                console.log(data)
            } catch {
                setBookmarks([]);
            } finally {
                setIsBookmarkLoading(false);
            }
        }

        fetchBookmarks();
    }, [isUserLoading, userData])

    return(
        <BookmarkContext.Provider value={{ 
            bookmarks, 
            setBookmarks, 
            isBookmarkLoading 
        }}>
            {children}
        </BookmarkContext.Provider>
    );
}

export default BookmarkProvider;