import db from "../config/laterboxDB.js";
import { bookmarkQueries } from "../queries/bookmarkQueries.js";

const getBookmarks = async (req, res) => {
    const { getBookmarks_query } = bookmarkQueries;

    try {
        const [bookmarks] = await db.promise().query(
            getBookmarks_query,
            [req.session.userId]
        )

        return res.status(200).json(
            bookmarks.map(bookmark => {
                return {
                    ...bookmark,
                    is_visited: bookmark.is_visited === 1,
                    is_starred: bookmark.is_starred === 1,
                    is_private: bookmark.is_private === 1,
                    tags: bookmark.tags.split(',')
                }
            })
        );
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const bookmarkControllers = {
    getBookmarks
}