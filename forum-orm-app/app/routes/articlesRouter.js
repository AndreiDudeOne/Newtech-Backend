import express from "express";
import authorize from "../middleware/authorize.js";
import articleController from "./../controllers/articlesController.js";

const articlesRouter = express.Router();

articlesRouter.get(
  "/:id",
  authorize.checkUserIsAuthenticated,
  articleController.getArticle
);

articlesRouter.post(
  "/createArticle",
  authorize.checkUserIsAuthenticated,
  articleController.createArticle
);

articlesRouter.put(
  "/:id/updateArticle",
  authorize.checkUserIsAuthenticated,
  articleController.updateArticle
);

articlesRouter.delete(
  "/:id/deleteArticle",
  authorize.checkUserIsAuthenticated,
  articleController.deleteArticle
);

articlesRouter.post(
  "/:id/addLike",
  authorize.checkUserIsAuthenticated,
  articleController.addLike
);
export default articlesRouter;
