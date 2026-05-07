import axios from "axios";
import * as cheerio from "cheerio";
import https from "https";
import Story from "../models/story.model.js";

export const scrapeHackerNews = async () => {
  const agent = new https.Agent({ family: 4, keepAlive: true });

  const { data } = await axios.get("https://news.ycombinator.com", {
    timeout: 60000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: "https://www.google.com/",
      Connection: "keep-alive",
    },
  });

  console.log("datata", data);

  const $ = cheerio.load(data);

  const stories = [];

  $(".athing").each((i, el) => {
    if (i >= 10) return false;

    const title = $(el).find(".titleline a").text();
    const url = $(el).find(".titleline a").attr("href");

    const subtext = $(el).next();

    const points = parseInt(subtext.find(".score").text()) || 0;
    const author = subtext.find(".hnuser").text();
    const postedAt = subtext.find(".age").text();

    stories.push({ title, url, points, author, postedAt });
  });

  // Clear old + insert fresh
  // await Story.deleteMany({});
  await Story.bulkWrite(
    stories.map((story) => ({
      updateOne: {
        filter: { url: story.url },
        update: { $set: story },
        upsert: true,
      },
    })),
  );

  return stories;
};
