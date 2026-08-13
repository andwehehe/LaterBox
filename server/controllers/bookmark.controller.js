import * as bookmarkServices from '../services/bookmark.services.js';

const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await bookmarkServices.getBookmarks(req.session.userId);
        return res.status(200).json(bookmarks);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to get bookmarks" });
    }
}

const getTargetBookmark = async (req, res) => {
    try {
        const bookmark_id = req.params.bookmark_id;
        const targetBookmark = await bookmarkServices.getTargetBookmark(bookmark_id);
        return res.status(200).json(targetBookmark);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to get bookmark" });
    }
}

const addBookmark = async (req, res) => {
    try {
        const user_id = req.session.userId;
        const { title, url, note, tags } = req.body;
        const newBookmark = await bookmarkServices.addBookmark({ 
            title, 
            url, 
            note, 
            tags, 
            user_id 
        });

        return res.status(201).json({ 
            message: "Bookmark added", 
            bookmark_id: newBookmark.bookmark_id, 
            saved_on: newBookmark.saved_on 
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add bookmark" });
    } 
}

const updateTags = async (req, res) => {
    try {
        const tags = req.body.tags;
        const bookmark_id = req.params.bookmark_id;

        const { message } = await bookmarkServices.updateTags(bookmark_id, tags);
        
        return res.status(200).json({ message });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Update failed" });
    }
}

const updateNote = async (req, res) => {
    try {
        const bookmark_id = req.params.bookmark_id;
        const note = req.body.note;

        await bookmarkServices.updateNote(note, bookmark_id);

        return res.status(200).json({ message: "Note updated" });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Update failed" });
    }
}

const updateIsStarred = async (req, res) => {
    try {
        const bookmark_id = req.params.bookmark_id;
        const is_starred = req.body.is_starred;
        const { message } = await bookmarkServices.updateIsStarred(is_starred, bookmark_id);
        return res.status(200).json({ message });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Update failed" });
    }
}

const deleteBookmark = async (req, res) => {
    try {
        const bookmark_id = req.params.bookmark_id;
        const tags = req.body.tags;
        await bookmarkServices.deleteBookmark(bookmark_id, tags);
        return res.status(200).json({ message: "Bookmark deleted" });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Delete failed" });
    }
}

const updateIsVisited = async (req, res) => {
    try {
        const bookmark_id = req.params.bookmark_id;
        const is_visited = req.body.is_visited;
        await bookmarkServices.updateIsVisited(is_visited, bookmark_id);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Update failed" })
    }
}

const suggestDetails = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ message: "URL missing" });

        const details = await bookmarkServices.suggestDetails(url);
        return res.status(200).json(details);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to get suggestion" });
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
    ,suggestDetails
}