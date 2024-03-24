import express from "express";

const cookieRouter = express.Router();

cookieRouter.get("/setDummyCookie", (req, res) => {
  // let minute = 6000 * 1000;
  res.cookie("cookie_name", "cookie_value", {
    maxAge: 1000 * 60 * 15, // expires in 15 minutes
    httpOnly: true, // makes the cookie accessible only by the web server
  });
  return res.send("cookie has been set!");
});

cookieRouter.get("/getDummyCookie", (req, res) => {
  console.log(req.cookies);
  return res.send("cookie has been retrieved!");
});

export default cookieRouter;
