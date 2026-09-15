import db from "../config/laterbox.db.js";
import prisma from "../utils/prisma.js";

// getBookmarks
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
export const createBookmark = async ({ user_id, title, url, note, tx }) => {
    const newBookmark = await tx.bookmarks.create({
        data: {
            user_id, 
            title, 
            url, 
            note
        }
    })
    
    return { 
        bookmark_id: newBookmark.bookmark_id,
        saved_on: newBookmark.saved_on
    };
}

export const addTag = async ({ tag, tx }) => {
    const newTag = await tx.tags.upsert({
        where: { tag },
        update: {},
        create: { tag }
    })

    return newTag.tag_id;
}

export const addBookmarkTagRelation = async ({ bookmark_id, tag_id, tx }) => {
    await tx.bookmark_tags.create({
        data: {
            bookmark_id, 
            tag_id
        }
    });
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
export const updateNote = async ({ note, bookmark_id }) => {
    await prisma.bookmarks.update({
        where: { bookmark_id: +bookmark_id },
        data: { note }
    })
}

// updateIsStarred
export const updateStarredStatus = async ({ is_starred, bookmark_id }) => {
    await prisma.bookmarks.update({
        where: { bookmark_id: +bookmark_id },
        data: { is_starred }
    });
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
    await prisma.bookmarks.update({
        where: { bookmark_id: +bookmark_id },
        data: { is_visited }
    })
}