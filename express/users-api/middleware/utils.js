const consoleLogRequestMid1 = (req, res, next) => {
  console.log(req.url, "1");
  next();
};

const consoleLogRequestMid2 = (req, res, next) => {
  console.log(req.url, "2");
  next();
};

const logDateTimeOfRequest = (req, res, next) => {
  const dateTime = Date.now();
  console.log(`Time is: ${dateTime}`);
  next();
};

const genericErrorHandleMiddleware = (err, req, res, next) => {
  if (err) {
    res.status(500).send("An error has occured!");
  }
  next();
};

export default {
  consoleLogRequestMid1,
  consoleLogRequestMid2,
  logDateTimeOfRequest,
  genericErrorHandleMiddleware,
};
