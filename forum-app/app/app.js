import express from "express";
import registerRouter from "./routes/registerRouter.js";
import loginRouter from "./routes/loginRouter.js";
import articlesRouter from "./routes/articlesRouter.js";

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", registerRouter);
app.use("/api", loginRouter);
app.use("/api/articles", articlesRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
