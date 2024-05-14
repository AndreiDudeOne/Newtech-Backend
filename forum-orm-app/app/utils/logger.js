import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      // singleLine: true,
    },
  },
});

export default logger;
