import express from "express";
import { runScraper } from "../controllers/scrape.controller.js";

const router = express.Router();

router.post("/", runScraper);

export default router;
