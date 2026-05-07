// App.jsx
import { Routes, Route } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Stories from "./pages/Stories";
import Login from "./pages/Login";
import Bookmarks from "./pages/Bookmarks";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Stories />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute user={user}>
              <Bookmarks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
