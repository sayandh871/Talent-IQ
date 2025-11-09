import express from "express";
import path from "path";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { connectDb } from "./lib/db.js";
import {serve} from "inngest/express"
import {inngest, functions} from "./lib/inngest.js"

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/inngest",serve({client:inngest, functions}))

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDb();
    app.listen(ENV.PORT, () =>
      console.log("server listening on port", ENV.PORT)
    );
  } catch (error) {
    console.log("Error connecting the server");
  }
};

startServer();
