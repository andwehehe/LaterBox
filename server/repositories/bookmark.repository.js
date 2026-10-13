import prisma from "../config/prisma.js";

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

export const getDashboardStatsByUserId = async (user_id) => {
    const [total, favorites, visited, unvisited] = await Promise.all([
        prisma.bookmarks.count({ where: { user_id } }),
        prisma.bookmarks.count({ where: { user_id, is_starred: true } }),
        prisma.bookmarks.count({ where: { user_id, is_visited: true } }),
        prisma.bookmarks.count({ where: { user_id, is_visited: { not: true } } })
    ]);

    return { total, favorites, visited, unvisited };
};

export const getRecentByUserId = async (user_id) => {
    return prisma.bookmarks.findMany({
        where: { user_id },
        orderBy: { saved_on: "desc" },
        take: 6,
        select: {
            bookmark_id: true,
            title: true,
            url: true,
            is_visited: true,
            is_starred: true,
            saved_on: true,
            bookmark_tags: {
                select: { tags: { select: { tag: true } } }
            }
        }
    });
};

export const getUrlsByUserId = async (user_id) => {
    return prisma.bookmarks.findMany({
        where: { user_id },
        select: { url: true }
    });
};

// getTargetBookmark
export const getByBookmarkId = async ({ bookmark_id, user_id }) => {
    const bookmark = await prisma.bookmarks.findFirst({
        where: { bookmark_id: Number(bookmark_id), user_id },
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
        update: { tag },
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
        where: { bookmark_id: Number(bookmark_id) },
        orderBy: { tag_id: "asc" },
        select: { tags: { select: { tag: true } } } 
    });

    return tags;
}

export const insertNewTag = async ({ tag, tx }) => {
    const newTag = await tx.tags.upsert({
        where: { tag },
        update: { tag },
        create: { tag }
    })

    return newTag.tag_id;
}

export const updateBookmarkTagRelation = async ({ bookmark_id, tag_id, tx }) => {
    await tx.bookmark_tags.create({
        data: {
            bookmark_id: Number(bookmark_id),
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
            bookmark_id: Number(bookmark_id),
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
export const updateNote = async ({ note, bookmark_id, user_id }) => {
    const result = await prisma.bookmarks.updateMany({
        where: { bookmark_id: Number(bookmark_id), user_id },
        data: { note }
    });
    if (result.count === 0) throw new Error("Bookmark not found");
}

// updateIsStarred
export const updateStarredStatus = async ({ is_starred, bookmark_id, user_id }) => {
    const result = await prisma.bookmarks.updateMany({
        where: { bookmark_id: Number(bookmark_id), user_id },
        data: { is_starred }
    });
    if (result.count === 0) throw new Error("Bookmark not found");
}

// deleteBookmark
export const deleteBookmarkById = async ({ bookmark_id, user_id, tx }) => {
    return tx.bookmarks.deleteMany({
        where: { bookmark_id: Number(bookmark_id), user_id }
    });
}

// updateIsVisited
export const updateVisitationStatus = async ({ is_visited, bookmark_id, user_id }) => {
    const result = await prisma.bookmarks.updateMany({
        where: { bookmark_id: Number(bookmark_id), user_id },
        data: { is_visited }
    });
    if (result.count === 0) throw new Error("Bookmark not found");
}