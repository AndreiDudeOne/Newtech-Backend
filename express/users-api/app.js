import express from "express";
import shiftsRouter from "./routes/shiftsRouter.js";
import cookieRouter from "./routes/cookiesRouter.js";
import playgroundRouter from "./routes/playgroundRouter.js";
import utilsMdw from "./middleware/utils.js";
import cookieParser from "cookie-parser";

const PORT = 3002;
const app = express();

const root = "/api";
const shiftsPath = "/api/shifts";

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Middleware function
app.use(utilsMdw.consoleLogRequestMid1);
app.use(utilsMdw.consoleLogRequestMid2);

app.use(utilsMdw.logDateTimeOfRequest);
app.use(shiftsPath, utilsMdw.logDateTimeOfRequest);

app.use(utilsMdw.genericErrorHandleMiddleware);

// Routes
app.use(shiftsPath, shiftsRouter);
app.use(root, playgroundRouter);
app.use(root, cookieRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
