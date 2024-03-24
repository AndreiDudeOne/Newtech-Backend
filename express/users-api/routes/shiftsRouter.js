import express from "express";
import shiftsController from "../controllers/shiftsController.js";
import utilsMdw from "../middleware/utils.js";

const shiftsRouter = express.Router();

const { getShifts, getShiftById, addShift, deleteShift, getShiftsPage } =
  shiftsController;

shiftsRouter.use(utilsMdw.logDateTimeOfRequest);

shiftsRouter.get("/", getShifts);
shiftsRouter.get("/:id", getShiftById);
shiftsRouter.post("/", addShift);
shiftsRouter.delete("/:id", deleteShift);
shiftsRouter.get("shiftsPage", getShiftsPage);

export default shiftsRouter;
