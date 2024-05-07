import jwt from "jsonwebtoken";

const checkUserIsAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    const deserializedToken = jwt.verify(token, process.env.SECRET_KEY);
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
