import { act } from "react";
import db from "../config/laterbox.db.js";

// getBookmarks
// try the query in mysql and experiment with joins
export const getByUserId = async (user_id) => {
    const [bookmarks] = await db.query(
        `SELECT  
            b.bookmark_id,
            b.title,
            b.url,
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
            b.is_visited,
            b.is_starred,
            b.is_private;
        `,
        [user_id]
    );

    return bookmarks;
}

// getTargetBookmark
export const getByBookmarkId = async (bookmark_id) => {
    const [bookmark] = await db.query(
        `SELECT  
            b.bookmark_id,
            b.title,
            b.url,
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
            b.is_visited,
            b.is_starred,
            b.is_private;
        `,
        [+bookmark_id]
    )

    return bookmark;
}

// addBookmark
export const createBookmark = async ({ user_id, title, url, platform, note, transaction }) => {
    const [newBookmark] = await transaction.query(
        `INSERT INTO bookmarks (user_id, title, url, note) 
         VALUES (?, ?, ?, ?)`,
        [user_id, title, url, note]
    );
    
    return newBookmark.insertId;
}

export const addTag = async (tag, transaction) => {
    const [newTag] = await transaction.query(
        `INSERT INTO tags (tag)
         VALUES (?)
         ON DUPLICATE KEY UPDATE
         tag_id = LAST_INSERT_ID(tag_id)`,
        [tag]
    );

    return newTag.insertId;
}

export const addBookmarkTagRelation = async (bookmark_id, tag_id, transaction) => {
    await transaction.query(
        `INSERT INTO bookmark_tags
         VALUES (?, ?)`,
         [bookmark_id, tag_id]
    );
}

export const getSaveTime = async (bookmark_id, transaction) => {
    const [saved_on] = await transaction.query(
        `SELECT saved_on FROM bookmarks
         WHERE bookmark_id = ?`,
         [bookmark_id]
    )

    return saved_on[0];
}

// updateTags
export const getTags = async (bookmark_id, transaction) => {
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

    return rows;
}

export const insertNewTag = async (tag, transaction) => {
    const [newTag] = await transaction.query(
        `INSERT INTO tags(tag)
         VALUES (?)
         ON DUPLICATE KEY UPDATE
         tag_id = LAST_INSERT_ID(tag_id)`,
         [tag]
    );

    return newTag.insertId;
}

export const updateBookmarkTagRelation = async (bookmark_id, tag_id, transaction) => {
    await transaction.query(
        `INSERT INTO bookmark_tags
         VALUES (?, ?)`,
         [+bookmark_id, tag_id]
    );
}

export const getTagsToRemove = async (removedTags, transaction) => {
    const [tagsToRemove] = await transaction.query(
        `SELECT tag_id FROM tags
         WHERE tag IN (?)`,
         [removedTags]
    );

    return tagsToRemove;
}

export const deleteBookmarkTagsRelation = async (bookmark_id, tagIdsToRemove, transaction) => {
    await transaction.query(
        `DELETE FROM bookmark_tags
         WHERE bookmark_id = ?
         AND tag_id IN (?)`,
         [+bookmark_id, tagIdsToRemove]
    );
}

export const getActiveTags = async (tagIdsToRemove, transaction) => {
    const [activeTags] = await transaction.query(
        `SELECT tag_id FROM bookmark_tags
         WHERE tag_id IN (?)`,
         [tagIdsToRemove]
    );

    return activeTags;
}

export const deleteInactiveTags = async (inactiveTagsIds, transaction) => {
    await transaction.query(
        `DELETE FROM tags
         WHERE tag_id IN (?)`,
         [inactiveTagsIds]
    );
}

// updateNote
export const updateNote = async (note, bookmark_id) => {
    await db.query(
        `UPDATE bookmarks
         SET note = ?
         WHERE bookmark_id = ?`,
         [note, +bookmark_id]
    );
}

// updateIsStarred
export const updateStarredStatus = async (is_starred, bookmark_id) => {
    await db.query(
        `UPDATE bookmarks
         SET is_starred = ?
         WHERE bookmark_id = ?`,
         [is_starred, +bookmark_id]
    );
}

// deleteBookmark
export const deleteBookmarkById = async (bookmark_id, transaction) => {
    await transaction.query(
        `DELETE FROM bookmarks
         WHERE bookmark_id = ?`,
         [+bookmark_id]
    );
}

// updateIsVisited
export const updateVisitationStatus = async (is_visited, bookmark_id) => {
    await db.query(
        `UPDATE bookmarks
         SET is_visited = ?
         WHERE bookmark_id = ?`,
         [is_visited, +bookmark_id]
    );
}