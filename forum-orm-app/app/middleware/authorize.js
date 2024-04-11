import { SECRET_KEY } from "../config/env-vars.js";
import jwt from "jsonwebtoken";

const checkUserIsAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  try {
    const deserializedToken = jwt.verify(token, SECRET_KEY);
    if (deserializedToken) {
      req.tokenData = deserializedToken;
      next();
    }
  } catch (error) {
    res.send(403, "Unauthorized access!");
  }
};

export default {
  checkUserIsAuthenticated,
};
