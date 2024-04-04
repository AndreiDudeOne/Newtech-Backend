import express from "express";
import authorize from "../middleware/authorize.js";
import articleController from "./../controllers/articlesController.js";

const articlesRouter = express.Router();

articlesRouter.post(
  "/createArticle",
  authorize.checkUserIsAuthenticated,
  articleController.createArticle
);

export default articlesRouter;
