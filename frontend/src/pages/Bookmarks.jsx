// pages/Bookmarks.jsx
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Bookmarks = () => {
  const [stories, setStories] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    const { data } = await api.get("/users/bookmarks", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setStories(data);
  };

  return (
    <div>
      <h1>Bookmarked Stories</h1>

      {stories.map((story) => (
        <div key={story._id}>
          <h3>{story.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Bookmarks;
