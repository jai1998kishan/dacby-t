import React, { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/register", formData);

      login(data);

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-3xl px-8 py-10 shadow-2xl"
      >
        <h1 className="text-white text-4xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-gray-400 text-sm text-center mt-2">
          Join News Scraper
        </p>

        {/* Name */}
        <div className="mt-8">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            className="w-full h-12 px-5 rounded-2xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 outline-none focus:border-indigo-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full h-12 px-5 rounded-2xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 outline-none focus:border-indigo-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full h-12 px-5 rounded-2xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 outline-none focus:border-indigo-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
        >
          Register
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?
          <Link to="/login" className="text-indigo-400 hover:underline ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
