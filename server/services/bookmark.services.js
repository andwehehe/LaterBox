import { bookmarks } from "../../client/LaterBox/src/pages/dashboard/mockData.js";
import db from "../config/laterbox.db.js";
import * as bookmarkRepository from '../repositories/bookmark.repository.js';

export const getBookmarks = async (user_id) => {
    const bookmarks = await bookmarkRepository.getByUserId(user_id);

    return bookmarks.map(bookmark => {
        return {
            ...bookmark,
            is_visited: bookmark.is_visited === 1,
            is_starred: bookmark.is_starred === 1,
            is_private: bookmark.is_private === 1,
            tags: bookmark.tags?.split(',')
        }
    });
}

export const getTargetBookmark = async (bookmark_id) => {
    const targetBookmark = await bookmarkRepository.getByBookmarkId(bookmark_id);

    return {
        ...targetBookmark[0],
        is_visited: targetBookmark[0].is_visited === 1,
        is_starred: targetBookmark[0].is_starred === 1,
        is_private: targetBookmark[0].is_private === 1,
        tags: targetBookmark[0].tags?.split(',') ?? []
    }
}

export const addBookmark = async ({ title, url, platform, note, tags, user_id }) => {
    const transaction = await db.getConnection();
    
    try {
        await transaction.beginTransaction();

        const bookmark_id = await bookmarkRepository.createBookmark({ 
            user_id, 
            title, 
            url, 
            platform, 
            note, 
            transaction 
        });

        for(const tag of tags) {
            const tag_id = await bookmarkRepository.addTag(tag, transaction);
            await bookmarkRepository.addBookmarkTagRelation(bookmark_id, tag_id, transaction);
        }

        // Fix date format later
        const { saved_on } = await bookmarkRepository.getSaveTime(bookmark_id, transaction);

        await transaction.commit();
        return { bookmark_id, saved_on };
    } catch(err) {
        await transaction.rollback();
        throw err;
    } finally {
        await transaction.release();
    }
}

// should not be called if there is not changes in the tags (must be handled in the frontend)
export const updateTags = async (bookmark_id, tags) => {
    const transaction = await db.getConnection();

    try {
        await transaction.beginTransaction();

        const allTags = await bookmarkRepository.getTags(bookmark_id, transaction);

        if(allTags.length === 0) {
            console.log("empty")
            return { message: "Tags not found" };
        }

        const currentTags = allTags[0].tags?.split(',') ?? [];
        const newTags = tags?.filter(tag =>
            !currentTags.some(
                current => current.toLowerCase() === tag.toLowerCase()
            )
        );

        const removedTags = currentTags.filter(t => !tags.includes(t));

        for(const tag of newTags) {
            const tag_id = await bookmarkRepository.insertNewTag(tag, transaction);
            await bookmarkRepository.updateBookmarkTagRelation(bookmark_id, tag_id, transaction);
        }

        let tagIdsToRemove = [];

        if(removedTags.length > 0) {
            const deletedTags = await bookmarkRepository.getTagsToRemove(removedTags, transaction);
            tagIdsToRemove = deletedTags.map(tag => tag.tag_id);
        }

        let inactiveTagsIds = [];

        if(tagIdsToRemove.length > 0) {
            await bookmarkRepository.deleteBookmarkTagsRelation(
                bookmark_id, 
                tagIdsToRemove, 
                transaction
            );

            const activeTags = await bookmarkRepository.getActiveTags(tagIdsToRemove, transaction);
            const activeTagsIds = activeTags.map(t => t.tag_id);

            inactiveTagsIds = tagIdsToRemove.filter(t => !activeTagsIds.includes(t));
        }

        if(inactiveTagsIds.length > 0) {
            await bookmarkRepository.deleteInactiveTags(inactiveTagsIds, transaction);
        }

        await transaction.commit();
        return { message: "Tags updated" };
    } catch(err) {
        await transaction.rollback();
        throw err;
    } finally {
        await transaction.release();
    }
}

export const updateNote = async (note, bookmark_id) => {
    await bookmarkRepository.updateNote(note, bookmark_id);
}

export const updateIsStarred = async (is_starred, bookmark_id) => {
    const message = is_starred ? 'Added to favorites' : 'Removed from favorites';
    await bookmarkRepository.updateStarredStatus(is_starred, bookmark_id);
    return { message };
}

export const deleteBookmark = async (bookmark_id, tags) => {
    const transaction = await db.getConnection();
    
    try {
        await transaction.beginTransaction();
        await bookmarkRepository.deleteBookmarkById(bookmark_id, transaction);

        let tagsIds = [];

        if(tags.length > 0) {
            const ids = await bookmarkRepository.getTagsToRemove(tags, transaction);
            tagsIds = ids.map(tag => tag.tag_id);
        }

        let inactiveTags = [];

        if(tagsIds.length > 0) {
            const activeTags = await bookmarkRepository.getActiveTags(tags, transaction);
            const activeTagsIds = activeTags.map(tag => tag.tag_id);
            inactiveTags = tagsIds.filter(tag => !activeTagsIds.includes(tag));
        }

        if(inactiveTags.length > 0) {
            await bookmarkRepository.deleteInactiveTags(inactiveTags, transaction);
        }

        await transaction.commit();
    } catch(err) {
        await transaction.rollback();
        throw err;
    } finally {
        await transaction.release();
    }
}

export const updateIsVisited = async (is_visited, bookmark_id) => {
    await bookmarkRepository.updateVisitationStatus(is_visited, bookmark_id);
}