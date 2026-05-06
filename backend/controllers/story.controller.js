import Story from "../models/story.model.js";

// GET all stories
export const getStories = async (req, res) => {
  const stories = await Story.find().sort({ points: -1 });
  res.json(stories);
};

// GET single story
export const getStoryById = async (req, res) => {
  const story = await Story.findById(req.params.id);
  res.json(story);
};

// Bookmark toggle
export const toggleBookmark = async (req, res) => {
  const user = req.user;

  const storyId = req.params.id;

  if (!user.bookmarks.includes(storyId)) {
    user.bookmarks.push(storyId);
  } else {
    user.bookmarks = user.bookmarks.filter((id) => id.toString() !== storyId);
  }

  await user.save();

  res.json({ message: "Bookmark updated", bookmarks: user.bookmarks });
};
