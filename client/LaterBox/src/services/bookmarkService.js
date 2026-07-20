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