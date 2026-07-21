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
        )
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
        )
    }
}