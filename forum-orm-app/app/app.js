import express from "express";
import registerRouter from "./routes/registerRouter.js";
import loginRouter from "./routes/loginRouter.js";
import articlesRouter from "./routes/articlesRouter.js";
import commentsRouter from "./routes/commentsRouter.js";
import feedRouter from "./routes/feedRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./utils/logger.js";

dotenv.config();

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", registerRouter);
app.use("/api", loginRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/feed", feedRouter);

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  // logger2.info(`Server started on port ${PORT}`);
  mongoose.connect(`${process.env.MONGO_URL}/forum-odm-db`).then(() => {
    logger.info("Db Connection started");
  });
});
