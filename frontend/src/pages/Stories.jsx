import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  // bookmarked story ids
  const [bookmarkedStories, setBookmarkedStories] = useState([]);

  const { user } = useContext(AuthContext);

  console.log("user", user);
  console.log("token", user?.token);

  // const fetchStories = async (currentPage = 1) => {
  //   try {
  //     const { data } = await api.get(`/stories?page=${currentPage}&limit=10`, {
  //       headers: {
  //         Authorization: user?.token ? `Bearer ${user.token}` : "",
  //       },
  //     });

  //     setStories(data.stories || []);

  //     setBookmarkedStories(data.bookmarks || []);

  //     setPagination(data.pagination);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchStories(page);
  // }, [page, user?.token]);

  useEffect(() => {
    const loadStories = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/stories?page=${page}&limit=10`, {
          headers: {
            Authorization: user?.token ? `Bearer ${user.token}` : "",
          },
        });

        setStories(data.stories || []);
        setBookmarkedStories(data.bookmarks || []);
        setPagination(data.pagination);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, [page, user]);

  const toggleBookmark = async (id) => {
    if (!user) return;

    try {
      await api.post(
        `/stories/${id}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      setBookmarkedStories((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-600">
          Loading stories...
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Top Hacker News Stories
          </h1>

          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with trending tech news and developer stories scraped
            directly from Hacker News.
          </p>
        </div>

        {/* Stories */}
        <div className="grid grid-cols-1 gap-6">
          {stories.map((story) => {
            const isBookmarked = bookmarkedStories.includes(story._id);

            return (
              <div
                key={story._id}
                className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Story Info */}
                  <div className="flex-1">
                    <a
                      href={story.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition"
                    >
                      {story.title}
                    </a>

                    <div className="flex flex-wrap items-center gap-3 mt-5 text-sm text-gray-500">
                      <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
                        🔥 {story.points} Points
                      </span>

                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        👤 {story.author}
                      </span>

                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        🕒 {story.postedAt}
                      </span>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  {user && (
                    <div>
                      <button
                        onClick={() => toggleBookmark(story._id)}
                        className={`px-5 py-3 rounded-2xl font-medium transition-all duration-300
                          ${
                            isBookmarked
                              ? "bg-yellow-400 text-black hover:bg-yellow-300"
                              : "bg-black text-white hover:bg-gray-800"
                          }`}
                      >
                        {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-10">
        {/* Previous */}
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-5 py-2 rounded-xl bg-black text-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {/* Page Info */}
        <div className="font-medium text-gray-700">
          Page {pagination.currentPage} of {pagination.totalPages}
        </div>

        {/* Next */}
        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-5 py-2 rounded-xl bg-black text-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Stories;
