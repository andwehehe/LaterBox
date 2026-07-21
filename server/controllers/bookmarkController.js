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
                    tags: bookmark.tags?.split(',')
                }
            })
        );
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const addBookmark = async (req, res) => {
    try {
        const { title, url, platform, note, tags } = req.body;

        const [result] = await db.promise().query(
            `INSERT INTO bookmarks (user_id, title, url, platform, note) VALUES (?, ?, ?, ?, ?)`,
            [req.session.userId, title, url, platform, note]
        );

        const bookmark_id = result.insertId;

        for(const tag of tags) {
            const [result] = await db.promise().query(
                `INSERT INTO tags (tag)
                 VALUES (?)
                 ON DUPLICATE KEY UPDATE
                 tag_id = LAST_INSERT_ID(tag_id)`,
                 [tag]
            );

            const tag_id = result.insertId;

            await db.promise().query(
                `INSERT INTO bookmark_tags
                 VALUES (?, ?)`,
                 [bookmark_id, tag_id]
            );
        }

        return res.status(201).json({ message: "Bookmark added", bookmark_id: result.insertId });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const bookmarkControllers = {
    getBookmarks,
    addBookmark
}