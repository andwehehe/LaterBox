import base from "../utils/baseURL.js";

export const getBookmarks = async () => {
    try {
        const res = await base.get('/bookmarks');
        return res.data;
    } catch(err) {
        throw new Error(
            err.response?.data?.message ||
            "Something went wrong",
            { cause: err }
        );
    }
}

export const getTargetBookmark = async (bookmark_id) => {
    try {
        const res = await base.get(`/bookmarks/${bookmark_id}`);
        return res.data;
    } catch(err) {
        throw new Error(
            err.response?.data?.message ||
            "Something went wrong",
            { cause: err }
        );
    }
}

export const addBookmark = async (title, url, platform, note, tags) => {
    try {
        const res = await base.post('/bookmarks/addbookmark', {
            title,
            url, 
            platform,
            note,
            tags: [...tags]
        })

        return res.data;
    } catch(err) {
        throw new Error(
            err.response?.data?.message ||
            "Something went wrong",
            { cause: err }
        );
    }
}

export const updateTags = async (bookmark_id, tags) => {
    try {
        const res = await base.patch(`/bookmarks/tags/${bookmark_id}`, {
            tags
        });

        return res.data;
    } catch(err) {
        throw new Error(
            err.response?.data?.message ||
            "Something went wrong.",
            { cause: err }
        );
    }
}

export const updateNote = async (bookmark_id, note) => {
    try {
        const res = await base.patch(`/bookmarks/note/${bookmark_id}`, {
            note
        });
        
        return res.data;
    } catch(err) {
        throw new Error(
            err.response?.data?.message ||
            "Something went wrong",
            { cause: err }
        );
    }
}

export const updateIsStarred = async (bookmark_id, is_starred) => {
    try {
        const res = await base.patch(`/bookmarks/is_starred/${bookmark_id}`, {
            is_starred
        });
        
        return res.data;
    } catch(err) {
        throw new Error(
            err.response?.data?.message ||
            "Something went wrong",
            { cause: err }
        );
    }
}

export const updateIsVisited = async (bookmark_id, is_visited) => {
    try {
        const res = await base.patch(`/bookmarks/is_visited/${bookmark_id}`, {
            is_visited
        })

        return res.data;
    } catch(err) {
        throw new Error(
            err.response?.data?.message ||
            "Something went wrong",
            { cause: err }
        )
    }
}

export const deleteBookmark = async (bookmark_id, tags) => {
    try {
        const res = await base.delete(`/bookmarks/delete/${bookmark_id}`, {
            data: {
                tags: tags ?? []
            }
        });

        return res.data;
    } catch(err) {
        throw new Error(
            err.response?.data?.message ||
            "Something went wrong",
            { cause: err }
        );
    }
}