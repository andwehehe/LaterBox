import express from "express";
import { requireAuth } from "../middlewares/requireAuth.js";
import { bookmarkControllers } from "../controllers/bookmarkController.js";

const bookmarkRouter = express.Router();
const { getBookmarks, addBookmark } = bookmarkControllers;

bookmarkRouter.get('/', requireAuth, getBookmarks);
bookmarkRouter.post('/addbookmark', requireAuth, addBookmark);

export default bookmarkRouter;