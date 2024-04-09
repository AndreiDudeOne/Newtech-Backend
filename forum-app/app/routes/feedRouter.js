import express from "express";
import authorize from "../middleware/authorize.js";
import feedController from "../controllers/feedController.js";

const feedRouter = express.Router();

feedRouter.get("", authorize.checkUserIsAuthenticated, feedController.getFeed);

export default feedRouter;
