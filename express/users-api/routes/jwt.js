import express from "express";
import jwt from "jsonwebtoken";

const jwtRouter = express.Router();

const secret = "SECRET KEY";
const data = {
  name: "Andrei",
  username: "andr",
};

jwtRouter.get("/jwt", (req, res) => {
  const token = jwt.sign(data, secret, { expiresIn: "7d" });

  const verf = jwt.verify(token, secret);

  console.log(verf);
  res.send(token);
});

export default jwtRouter;
