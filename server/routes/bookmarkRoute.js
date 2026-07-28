import express from "express";
import { requireAuth } from "../middlewares/requireAuth.js";
import { bookmarkControllers } from "../controllers/bookmarkController.js";

const bookmarkRouter = express.Router();
const { 
    getBookmarks, addBookmark, 
    getTargetBookmark, updateTags, 
    updateNote, updateIsStarred 
} = bookmarkControllers;

bookmarkRouter.get('/', requireAuth, getBookmarks);
bookmarkRouter.post('/addbookmark', requireAuth, addBookmark);
bookmarkRouter.get('/:bookmark_id', requireAuth, getTargetBookmark);

bookmarkRouter.patch('/tags/:bookmark_id', requireAuth, updateTags);
bookmarkRouter.patch('/note/:bookmark_id', requireAuth, updateNote);
bookmarkRouter.patch('/is_starred/:bookmark_id', requireAuth, updateIsStarred);

export default bookmarkRouter;