import express from "express";
import {
  getStories,
  getStoryById,
  toggleBookmark,
} from "../controllers/story.controller.js";
import { optionalAuth, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", optionalAuth, getStories);
router.get("/:id", getStoryById);
router.post("/:id/bookmark", protect, toggleBookmark);

export default router;
