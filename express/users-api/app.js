import express from "express";
import shiftsRouter from "./routes/shiftsRouter.js";
import cookieRouter from "./routes/cookiesRouter.js";
import playgroundRouter from "./routes/playgroundRouter.js";
import utilsMdw from "./middleware/utils.js";
import cookieParser from "cookie-parser";
import sessionRouter from "./routes/sessionRouter.js";
import session from "express-session";
import jwtRouter from "./routes/jwtRouter.js";

const PORT = 3002;
const app = express();

const root = "/api";
const shiftsPath = "/api/shifts";

app.use(
  session({
    secret: "our secret key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 15 },
  })
);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Middleware function
app.use(utilsMdw.consoleLogRequestMid1);
app.use(utilsMdw.consoleLogRequestMid2);

app.use(utilsMdw.logDateTimeOfRequest);
app.use(shiftsPath, utilsMdw.logDateTimeOfRequest);

app.use(utilsMdw.genericErrorHandleMiddleware);

// Routers with routes
app.use(shiftsPath, shiftsRouter);
app.use(root, playgroundRouter);
app.use(root, cookieRouter);
app.use(root, sessionRouter);
app.use(root, jwtRouter);
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
