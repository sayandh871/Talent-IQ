import express from "express";
import { ENV } from "./lib/env.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "success from api" });
});

app.listen(ENV.PORT, () => console.log("server listening on port: ",ENV.PORT))