import express from "express";
import cors from "cors";
import intelligenceRoutes from "./routes/intelligence.js";

const app = express();

console.log("Loading intelligence routes...");

app.use(cors());
app.use(express.json());

app.use("/api/intel", intelligenceRoutes);

app.get("/health", (req, res) => res.send({ status: "ok" }));

export default app;
