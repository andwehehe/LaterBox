import db from "../config/laterbox.db.js";
import prisma from "../utils/prisma.js";

// getBookmarks
export const getByUserId = async (user_id) => {
    const bookmarks = await prisma.bookmarks.findMany({
        where: { user_id },
        select: {
            bookmark_id: true,
            title: true,
            url: true,
            note: true,
            is_visited: true,
            is_starred: true,
            is_private: true,
            saved_on: true,
            bookmark_tags: {
                select: {
                    tags: { select: { tag: true } }
                }
            }
        }
    })

    return bookmarks;
}

// getTargetBookmark
export const getByBookmarkId = async (bookmark_id) => {
    const bookmark = await prisma.bookmarks.findMany({
        where: { bookmark_id: +bookmark_id },
        select: {
            bookmark_id: true,
            title: true,
            url: true,
            note: true,
            is_visited: true,
            is_starred: true,
            is_private: true,
            saved_on: true,
            bookmark_tags: {
                select: {
                    tags: { select: { tag: true } }
                }
            }
        }
    })

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
export const getTags = async ({ bookmark_id, tx }) => {
    const tags = await tx.bookmark_tags.findMany({
        where: { bookmark_id: +bookmark_id },
        orderBy: { tag_id: "asc" },
        select: { tags: { select: { tag: true } } } 
    });

    return tags;
}

export const insertNewTag = async ({ tag, tx }) => {
    const newTag = await tx.tags.upsert({
        where: { tag },
        update: {},
        create: { tag }
    })

    return newTag.tag_id;
}

export const updateBookmarkTagRelation = async ({ bookmark_id, tag_id, tx }) => {
    await tx.bookmark_tags.create({
        data: {
            bookmark_id: +bookmark_id,
            tag_id
        }
    });
}

export const getTagsToRemove = async ({ removedTags, tx }) => {
    const tagsToRemove = await tx.tags.findMany({
        where: {
            tag: { in: removedTags }
        },
        select: { tag_id: true }
    });

    return tagsToRemove;
}

export const deleteBookmarkTagsRelation = async ({ bookmark_id, tagIdsToRemove, tx }) => {
   await tx.bookmark_tags.deleteMany({
        where: { 
            bookmark_id: +bookmark_id,
            tag_id: { in: tagIdsToRemove }
        }
    });
}

export const getActiveTags = async ({ tags, tx }) => {
    const activeTags = await tx.bookmark_tags.findMany({
        where: {
            tag_id: { in: tags }
        },
        select: { tag_id: true }
    });

    return activeTags;
}

export const deleteInactiveTags = async ({ inactiveTagsIds, tx }) => {
    await tx.tags.deleteMany({
        where: {
            tag_id: { in: inactiveTagsIds }
        }
    })
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
export const deleteBookmarkById = async ({ bookmark_id, tx }) => {
    await tx.bookmarks.delete({
        where: {
            bookmark_id: +bookmark_id
        }
    });
}

// updateIsVisited
export const updateVisitationStatus = async ({ is_visited, bookmark_id }) => {
    await prisma.bookmarks.update({
        where: { bookmark_id: +bookmark_id },
        data: { is_visited }
    })
}