import asyncHandler from "express-async-handler";
import { scrapeHackerNews } from "../services/scraper.service.js";

export const runScraper = asyncHandler(async (req, res) => {
  const data = await scrapeHackerNews();

  res.json({ message: "Scraped successfully", data });
});
