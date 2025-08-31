

import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";
import { Server } from "socket.io";
import path from "path";



const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

app.use(express.static(path.join(process.cwd(), "build"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    }
  }
}));

// Fallback for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "build", "index.html"));
});





const start = async () => {
    try {
        const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/zoom-db";
        
        if (!MONGO_URL) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }
        
        const connectionDb = await mongoose.connect(MONGO_URL);
        console.log(`MongoDB connected successfully: ${connectionDb.connection.host}`);
        
        server.listen(app.get("port"), () => {
            console.log(`Server listening on port ${app.get("port")}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
}

start();
