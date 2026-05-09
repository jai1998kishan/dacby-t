import express from "express";

import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";

import { scrapeHackerNews } from "./services/scraper.service.js";

import authRoutes from "./routes/auth.routes.js";
import scraperRoutes from "./routes/scrape.routes.js";
import storyRoutes from "./routes/story.routes.js";

dotenv.config();

const app = express();

//Middleware
app.use(express.json());

app.use(
  cors({
    origin: "https://dacby-t.vercel.app", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(helmet());

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is live",
  });
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/scrape", scraperRoutes);
app.use("/api/stories", storyRoutes);

//DB Connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");
    //Run scraper on start

    try {
      await scrapeHackerNews();
      console.log("Scraping done");
    } catch (err) {
      console.log("Scraper failed:", err.message);
    }
  })
  .catch((err) => console.log(err));

//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
