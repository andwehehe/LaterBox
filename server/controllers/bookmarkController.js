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

const getTargetBookmark = async (req, res) => {
    const { getTargetBookmark_query } = bookmarkQueries;
    const { bookmark_id } = req.params;

    try {
        const [bookmark] = await db.promise().query(
            getTargetBookmark_query,
            [+bookmark_id]
        )

        return res.status(200).json(
            {
                ...bookmark[0],
                is_visited: bookmark[0].is_visited === 1,
                is_starred: bookmark[0].is_starred === 1,
                is_private: bookmark[0].is_private === 1,
                tags: bookmark[0].tags?.split(',')
            }
        );
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const addBookmark = async (req, res) => {

    // modify later: add another query that returns the whole thing
    const currentDate = new Date().toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

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

        return res.status(201).json({ message: "Bookmark added", bookmark_id: result.insertId, saved_on: currentDate });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const updateTags = async (req, res) => {
    const { tags } = req.body;
    const bookmark_id = req.params.bookmark_id;

    try {
        const [rows] = await db.promise().query(
            `SELECT GROUP_CONCAT(t.tag ORDER BY t.tag_id SEPARATOR ',') AS tags
            FROM bookmarks b
            LEFT JOIN bookmark_tags bt
            ON b.bookmark_id = bt.bookmark_id
            LEFT JOIN tags t
            ON bt.tag_id = t.tag_id
            WHERE b.bookmark_id = ?`,
            [+bookmark_id]
        );

        if(rows.length === 0) {
            return res.status(404).json({ message: "Tags not found" });
        }

        const currentTags = rows[0].tags?.split(',') ?? [];
        const newTags = tags.filter(t => !currentTags.includes(t));
        const removedTags = currentTags.filter(t => !tags.includes(t));

        for(const tag of newTags) {
            const [result] = await db.promise().query(
                `INSERT INTO tags(tag)
                 VALUES (?)
                 ON DUPLICATE KEY UPDATE
                 tag_id = LAST_INSERT_ID(tag_id)`,
                [tag]
            );

            const tag_id = result.insertId;

            await db.promise().query(
                `INSERT INTO bookmark_tags
                 VALUES (?, ?)`,
                 [+bookmark_id, tag_id]
            );
        }

        let tagIdsToRemove = [];

        if(removedTags.length > 0) {
            const [tagsToRemove] = await db.promise().query(
                `SELECT tag_id FROM tags
                 WHERE tag IN (?)`,
                [removedTags]
            );

            tagIdsToRemove = tagsToRemove.map(tag => tag.tag_id);
        }

        let inactiveTagsIds = [];

        if(tagIdsToRemove.length > 0) {
            await db.promise().query(
                `DELETE FROM bookmark_tags
                 WHERE bookmark_id = ?
                 AND tag_id IN (?)`,
                [+bookmark_id, tagIdsToRemove]
            );

            const [activeTags] = await db.promise().query(
                `SELECT tag_id FROM bookmark_tags
                 WHERE tag_id IN (?)`,
                [tagIdsToRemove]
            );

            const activeTagsIds = activeTags?.map(t => t.tag_id) ?? [];
            inactiveTagsIds = tagIdsToRemove.filter(t => !activeTagsIds.includes(t));
        }

        if(inactiveTagsIds.length > 0) {
            await db.promise().query(
                `DELETE FROM tags
                 WHERE tag_id IN (?)`,
                [inactiveTagsIds]
            );
        }
        
        return res.status(200).json({ message: "Tags updated" });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const updateNote = async (req, res) => {
    const bookmark_id = req.params.bookmark_id;
    const { note } = req.body;

    try {
        const [result] = await db.promise().query(
            `UPDATE bookmarks
             SET note = ?
             WHERE bookmark_id = ?`,
            [note, +bookmark_id]
        );

        return res.status(200).json({ message: "Note updated" });
    } catch(err) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

const updateIsStarred = async (req, res) => {
    const bookmark_id = req.params.bookmark_id;
    const { is_starred } = req.body;
    const message = is_starred ? 'Added to favorites' : 'Removed from favorites';

    try {
        const [result] = await db.promise().query(
            `UPDATE bookmarks
             SET is_starred = ?
             WHERE bookmark_id = ?`,
             [is_starred, +bookmark_id]
        );

        return res.status(200).json({ message: message });
    } catch(err) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

export const bookmarkControllers = {
    getBookmarks,
    addBookmark,
    getTargetBookmark,
    updateTags,
    updateNote,
    updateIsStarred
}