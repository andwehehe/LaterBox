import express from "express";
import { requireAuth } from "../middlewares/requireAuth.js";
import { bookmarkControllers } from "../controllers/bookmarkController.js";

const bookmarkRouter = express.Router();
const { getBookmarks, addBookmark, getTargetBookmark, updateTags } = bookmarkControllers;

bookmarkRouter.get('/', requireAuth, getBookmarks);
bookmarkRouter.post('/addbookmark', requireAuth, addBookmark);
bookmarkRouter.get('/:bookmark_id', requireAuth, getTargetBookmark);
bookmarkRouter.patch('/:bookmark_id', requireAuth, updateTags);

export default bookmarkRouter;