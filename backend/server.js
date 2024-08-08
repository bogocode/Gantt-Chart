import express from "express";
import router from "./routes/routes.js";
import dotenv from "dotenv";
import conncetDB from "./db.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);

const PORT = process.env.PORT | 4000;
app.listen(PORT, async () => {
  // connect to db here
  console.log("server listening");
  conncetDB();
});
