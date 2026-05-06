import express from "express";
import {
  getStories,
  getStoryById,
  toggleBookmark,
} from "../controllers/story.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getStories);
router.get("/:id", getStoryById);
router.post("/:id/bookmark", protect, toggleBookmark);

export default router;
