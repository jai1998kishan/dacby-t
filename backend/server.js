import express from "express";

import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

//Routes
app.use("/api/auth", authRoutes);

//DB Connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
