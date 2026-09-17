import { getMetadata } from "../utils/utility.metadata.js";
import * as bookmarkRepository from '../repositories/bookmark.repository.js';
import prisma from "../utils/prisma.js";
import { formatDate } from "../utils/utility.date_formatter.js";

export const getBookmarks = async (user_id) => {
    const bookmarks = await bookmarkRepository.getByUserId(user_id);

    return Promise.all(
        bookmarks.map(async (bookmark) => {
            const metadata = await getMetadata(bookmark.url)

            const tags = bookmark.bookmark_tags?.map(({ tags }) => {
                return tags.tag;
            });

            const formattedDate = formatDate(bookmark.saved_on);
            
            return {
                ...bookmark,
                is_visited: bookmark.is_visited === 1,
                is_starred: bookmark.is_starred === 1,
                is_private: bookmark.is_private === 1,
                saved_on: formattedDate,
                tags,
                metadata: {
                    platform: metadata.platform,
                    thumbnail: metadata.thumbnail,
                    icon: metadata.icon
                }
            }
        })
    );
}

export const getTargetBookmark = async (bookmark_id) => {
    const targetBookmark = await bookmarkRepository.getByBookmarkId(bookmark_id);

    const metadata = await getMetadata(targetBookmark[0].url)

    const tags = targetBookmark.bookmark_tags?.map(({ tags }) => {
        return tags.tag;
    });

    const formattedDate = formatDate(targetBookmark.saved_on);

    return {
        ...targetBookmark[0],
        is_visited: targetBookmark[0].is_visited === 1,
        is_starred: targetBookmark[0].is_starred === 1,
        is_private: targetBookmark[0].is_private === 1,
        saved_on: formattedDate,
        tags,
        metadata
    }
}

export const addBookmark = async ({ title, url, note, tags, user_id }) => {
    const bookmarkTransact = await prisma.$transaction(async (tx) => {
        const bookmark = await bookmarkRepository.createBookmark({ 
            user_id, 
            title, 
            url, 
            note, 
            tx 
        });

        for(const tag of tags) {
            const tag_id = await bookmarkRepository.addTag({ tag, tx });
            await bookmarkRepository.addBookmarkTagRelation({ 
                bookmark_id: bookmark.bookmark_id, 
                tag_id, 
                tx 
            });
        }

        return {
            bookmark_id: bookmark.bookmark_id, 
            saved_on: bookmark.saved_on
        }
    })

    return { 
        bookmark_id: bookmarkTransact.bookmark_id, 
        saved_on: bookmarkTransact.saved_on 
    }
}

export const updateTags = async ({ bookmark_id, tags }) => {
    await prisma.$transaction(async (tx) => {
        const allTags = await bookmarkRepository.getTags({ bookmark_id, tx });
        const currentTags = allTags.map(tag => tag.tags.tag);
        const newTags = tags.filter(t => !currentTags.includes(t));
        const removedTags = currentTags.filter(t => !tags.includes(t));
        let tagIdsToRemove = [];
        let inactiveTagsIds = [];

        for(const tag of newTags) {
            const tag_id = await bookmarkRepository.insertNewTag({ tag, tx });
            await bookmarkRepository.updateBookmarkTagRelation({ bookmark_id, tag_id, tx });
        }

        if(removedTags.length > 0) {
            const deletedTags = await bookmarkRepository.getTagsToRemove({ removedTags, tx });
            tagIdsToRemove = deletedTags.map(tag => tag.tag_id);
        }

        if(tagIdsToRemove.length > 0) {
            await bookmarkRepository.deleteBookmarkTagsRelation({
                bookmark_id, 
                tagIdsToRemove, 
                tx
            });

            const activeTags = await bookmarkRepository.getActiveTags({ tagIdsToRemove, tx });
            const activeTagsIds = activeTags.map(t => t.tag_id);

            inactiveTagsIds = tagIdsToRemove.filter(t => !activeTagsIds.includes(t));
        }

        if(inactiveTagsIds.length > 0) {
            await bookmarkRepository.deleteInactiveTags({ inactiveTagsIds, tx });
        }
    });

    return { message: "Tags updated" };
}

export const updateNote = async ({ note, bookmark_id }) => {
    await bookmarkRepository.updateNote({ note, bookmark_id });
    return { message: "Note updated" };
}

export const updateIsStarred = async ({ is_starred, bookmark_id }) => {
    const message = is_starred ? 'Added to favorites' : 'Removed from favorites';
    await bookmarkRepository.updateStarredStatus({ is_starred, bookmark_id });
    return { message };
}

export const deleteBookmark = async ({ bookmark_id, tags }) => {
    await prisma.$transaction(async (tx) => {
        await bookmarkRepository.deleteBookmarkById(bookmark_id, tx);

        let tagsIds = [];

        if(tags.length > 0) {
            const ids = await bookmarkRepository.getTagsToRemove({ tags, tx });
            tagsIds = ids.map(tag => tag.tag_id);
        }

        let inactiveTags = [];

        if(tagsIds.length > 0) {
            const activeTags = await bookmarkRepository.getActiveTags(tags, tx);
            const activeTagsIds = activeTags.map(tag => tag.tag_id);
            inactiveTags = tagsIds.filter(tag => !activeTagsIds.includes(tag));
        }

        if(inactiveTags.length > 0) {
            await bookmarkRepository.deleteInactiveTags({ inactiveTags, tx });
        }
    });

    return { message: "Bookmark Deleted." }
}

export const updateIsVisited = async ({ is_visited, bookmark_id }) => {
    await bookmarkRepository.updateVisitationStatus({ is_visited, bookmark_id });
}

export const suggestDetails = async (url) => {
    try {
        const details = await getMetadata(url);
        return details;
    } catch (err) {
        throw err;
    }
}