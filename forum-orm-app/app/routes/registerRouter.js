import express from "express";
import registerController from "../controllers/registerController.js";

const registerRouter = express.Router();

registerRouter.post("/register", registerController.register);

export default registerRouter;
