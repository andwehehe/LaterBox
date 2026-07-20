import express from "express";
import { requireAuth } from "../middlewares/requireAuth.js";
import { bookmarkControllers } from "../controllers/bookmarkController.js";

const bookmarkRouter = express.Router();
const { getBookmarks } = bookmarkControllers;

bookmarkRouter.get('/', requireAuth, getBookmarks);

export default bookmarkRouter;