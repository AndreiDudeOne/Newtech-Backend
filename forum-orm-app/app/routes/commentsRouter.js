import express from "express";
import authorize from "../middleware/authorize.js";
import commentsController from "./../controllers/commentsController.js";

const commentsRouter = express.Router();

commentsRouter.post(
  "/addComment",
  authorize.checkUserIsAuthenticated,
  commentsController.addComment
);

export default commentsRouter;
