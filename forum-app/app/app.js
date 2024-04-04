import express from "express";
import jwt from "jsonwebtoken";
import db from "./config/db.js";
import registerRouter from "./routes/registerRouter.js";

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", registerRouter);

// app.use(cookieParser());

app.listen(PORT, () => {
  // db.connect()
  //   .then(() => {
  //     console.log("Connection Started");
  //   })
  //   .catch((er) => {
  //     console.log("There was an error with the connection");
  //   });
  console.log(`Server started on port ${PORT}`);
});
