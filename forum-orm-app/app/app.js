import express from "express";
import registerRouter from "./routes/registerRouter.js";
import loginRouter from "./routes/loginRouter.js";
import articlesRouter from "./routes/articlesRouter.js";
import commentsRouter from "./routes/commentsRouter.js";
import mongoose from "mongoose";
import { MONGO_URL } from "./config/env-vars.js";
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", registerRouter);
app.use("/api", loginRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/comments", commentsRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  mongoose.connect(`${MONGO_URL}/forum-odm-db`).then(() => {
    console.log("Db Connection started");
  });
});
