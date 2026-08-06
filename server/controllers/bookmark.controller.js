import db from "../config/laterbox.db.js";

const getBookmarks = async (req, res) => {
    try {
        const [bookmarks] = await db.query(
            `SELECT  
                b.bookmark_id,
                b.title,
                b.url,
                b.platform,
                b.note,
                b.is_visited,
                b.is_starred,
                b.is_private,
                DATE_FORMAT(b.saved_on, '%M %d, %Y') AS saved_on,
                GROUP_CONCAT(t.tag ORDER BY t.tag_id SEPARATOR ',') AS tags
            FROM bookmarks b 
            LEFT JOIN bookmark_tags bt
                ON b.bookmark_id = bt.bookmark_id
            LEFT JOIN tags t
                ON bt.tag_id = t.tag_id
            WHERE b.user_id = ?
            GROUP BY
                b.bookmark_id,
                b.title,
                b.url,
                b.note,
                b.platform,
                b.is_visited,
                b.is_starred,
                b.is_private;
            `,
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
        return res.status(500).json({ message: "Failed to get bookmarks" });
    }
}

const getTargetBookmark = async (req, res) => {
    const { bookmark_id } = req.params;

    try {
        const [bookmark] = await db.query(
            `SELECT  
                b.bookmark_id,
                b.title,
                b.url,
                b.platform,
                b.note,
                b.is_visited,
                b.is_starred,
                b.is_private,
                DATE_FORMAT(b.saved_on, '%M %d, %Y') AS saved_on,
                GROUP_CONCAT(t.tag ORDER BY t.tag_id SEPARATOR ',') AS tags
            FROM bookmarks b 
            LEFT JOIN bookmark_tags bt
                ON b.bookmark_id = bt.bookmark_id
            LEFT JOIN tags t
                ON bt.tag_id = t.tag_id
            WHERE b.bookmark_id = ?
            GROUP BY
                b.bookmark_id,
                b.title,
                b.url,
                b.note,
                b.platform,
                b.is_visited,
                b.is_starred,
                b.is_private;
            `,
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
        return res.status(500).json({ message: "Failed to get bookmark" });
    }
}

const addBookmark = async (req, res) => {

    // modify later: add another query that returns the whole thing
    const currentDate = new Date().toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const transaction = await db.getConnection();

    try {
        await transaction.beginTransaction();

        const { title, url, platform, note, tags } = req.body;

        const [result] = await transaction.query(
            `INSERT INTO bookmarks (user_id, title, url, platform, note) VALUES (?, ?, ?, ?, ?)`,
            [req.session.userId, title, url, platform, note]
        );

        const bookmark_id = result.insertId;

        for(const tag of tags) {
            const [result] = await transaction.query(
                `INSERT INTO tags (tag)
                 VALUES (?)
                 ON DUPLICATE KEY UPDATE
                 tag_id = LAST_INSERT_ID(tag_id)`,
                 [tag]
            );

            const tag_id = result.insertId;

            await transaction.query(
                `INSERT INTO bookmark_tags
                 VALUES (?, ?)`,
                 [bookmark_id, tag_id]
            );
        }

        await transaction.commit()

        return res.status(201).json({ message: "Bookmark added", bookmark_id: result.insertId, saved_on: currentDate });
    } catch(err) {
        await transaction.rollback();
        console.error(err);
        return res.status(500).json({ message: "Failed to add bookmark" });
    } finally {
        await transaction.release();
    }
}

const updateTags = async (req, res) => {
    const transaction = await db.getConnection();

    try {
        await transaction.beginTransaction();

        const { tags } = req.body;
        const bookmark_id = req.params.bookmark_id;

        const [rows] = await transaction.query(
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
            const [result] = await transaction.query(
                `INSERT INTO tags(tag)
                 VALUES (?)
                 ON DUPLICATE KEY UPDATE
                 tag_id = LAST_INSERT_ID(tag_id)`,
                [tag]
            );

            const tag_id = result.insertId;

            await transaction.query(
                `INSERT INTO bookmark_tags
                 VALUES (?, ?)`,
                 [+bookmark_id, tag_id]
            );
        }

        let tagIdsToRemove = [];

        if(removedTags.length > 0) {
            const [tagsToRemove] = await transaction.query(
                `SELECT tag_id FROM tags
                 WHERE tag IN (?)`,
                [removedTags]
            );

            tagIdsToRemove = tagsToRemove.map(tag => tag.tag_id);
        }

        let inactiveTagsIds = [];

        if(tagIdsToRemove.length > 0) {
            await transaction.query(
                `DELETE FROM bookmark_tags
                 WHERE bookmark_id = ?
                 AND tag_id IN (?)`,
                [+bookmark_id, tagIdsToRemove]
            );

            const [activeTags] = await transaction.query(
                `SELECT tag_id FROM bookmark_tags
                 WHERE tag_id IN (?)`,
                [tagIdsToRemove]
            );

            const activeTagsIds = activeTags?.map(t => t.tag_id) ?? [];
            inactiveTagsIds = tagIdsToRemove.filter(t => !activeTagsIds.includes(t));
        }

        if(inactiveTagsIds.length > 0) {
            await transaction.query(
                `DELETE FROM tags
                 WHERE tag_id IN (?)`,
                [inactiveTagsIds]
            );
        }

        await transaction.commit();
        
        return res.status(200).json({ message: "Tags updated" });
    } catch(err) {
        await transaction.rollback();
        console.error(err);
        return res.status(500).json({ message: "Update failed" });
    } finally {
        await transaction.release();
    }
}

const updateNote = async (req, res) => {
    const bookmark_id = req.params.bookmark_id;
    const { note } = req.body;

    try {
        await db.query(
            `UPDATE bookmarks
             SET note = ?
             WHERE bookmark_id = ?`,
            [note, +bookmark_id]
        );

        return res.status(200).json({ message: "Note updated" });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Update failed" });
    }
}

const updateIsStarred = async (req, res) => {
    const bookmark_id = req.params.bookmark_id;
    const { is_starred } = req.body;
    const message = is_starred ? 'Added to favorites' : 'Removed from favorites';

    try {
        await db.query(
            `UPDATE bookmarks
             SET is_starred = ?
             WHERE bookmark_id = ?`,
             [is_starred, +bookmark_id]
        );

        return res.status(200).json({ message: message });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Update failed" });
    }
}

const deleteBookmark = async (req, res) => {
    const transaction = await transaction.getConnection();

    try {
        await transaction.beginTransaction();

        const bookmark_id = req.params.bookmark_id;
        const { tags } = req.body;

        const [result] = await transaction.query(
            `DELETE FROM bookmarks
             WHERE bookmark_id = ?`,
             [+bookmark_id]
        );

        let tagsIds = [];

        if(tags.length > 0) {
            const [ids] = await transaction.query(
                `SELECT tag_id FROM tags
                 WHERE tag IN (?)`,
                 [tags]
            );

            tagsIds = ids.map(tag => tag.tag_id);
        }

        let inactiveTags = [];

        if(tagsIds.length > 0) {
            const [activeTags] = await transaction.query(
                `SELECT tag_id FROM bookmark_tags
                 WHERE tag_id IN (?)`,
                 [tagsIds]
            );

            let activeTagsIds = activeTags.map(tag => tag.tag_id);
            inactiveTags = tagsIds.filter(tag => !activeTagsIds.includes(tag));
        }

        if(inactiveTags.length > 0) {
            const [deleted] = await transaction.query(
                `DELETE FROM tags
                 WHERE tag_id IN (?)`,
                 [inactiveTags]
            );
        }

        await transaction.commit();

        return res.status(200).json({ message: "Bookmark deleted" });
    } catch(err) {
        await transaction.rollback();
        console.error(err);
        return res.status(500).json({ message: "Delete failed" });
    } finally {
        await transaction.release();
    }
}

const updateIsVisited = async (req, res) => {
    const bookmark_id = req.params.bookmark_id;
    const { is_visited } = req.body;
    console.log(is_visited)

    try {
        await db.query(
            `UPDATE FROM bookmarks
             SET is_visited = ?
             WHERE bookmark_id = ?`,
             [is_visited, +bookmark_id]
        );
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Update failed" })
    }
}

export const bookmarkControllers = {
    getBookmarks,
    addBookmark,
    getTargetBookmark,
    updateTags,
    updateNote,
    updateIsStarred,
    deleteBookmark,
    updateIsVisited
}