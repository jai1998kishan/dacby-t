import Story from "../models/story.model.js";

// GET all stories
// GET all stories with pagination

export const getStories = async (req, res) => {
  try {
    // query params
    const page = Number(req.query.page) || 1;

    const limit = Math.min(Number(req.query.limit) || 10, 50);

    // calculate skip
    const skip = (page - 1) * limit;

    // total count
    const totalStories = await Story.countDocuments();

    // paginated stories
    const stories = await Story.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit);

    let bookmarks = [];

    // logged in user bookmarks
    if (req.user) {
      bookmarks = req.user.bookmarks.map((id) => id.toString());
    }

    res.json({
      stories,
      bookmarks,

      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalStories / limit),
        totalStories,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
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
