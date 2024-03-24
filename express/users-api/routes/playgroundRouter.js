import express from "express";
import fs from "fs";

const playgroundRouter = express.Router();

// Normally we would extract the functionality outside (controller, service)
playgroundRouter.get("/users", (req, res) => {
  console.log(req.headers);
  console.log(req.url);
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  res.status(200).send({ respMessage: "Request was received correctly" });
});

playgroundRouter.post("/addUser", (req, res) => {
  console.log(req.body, "Body");
  const userData = req.body;
  res.send(userData);
});

playgroundRouter.get("/getHtmlData", (req, res) => {
  res.end("<html><p>Hello dear!</p></html>");
});

playgroundRouter.get("/getJsonData", (req, res) => {
  res.send({
    name: "Michael",
    surname: "Jordan",
    number: 23,
  });
});

playgroundRouter.get("/generic/:var/:var2", (req, res) => {
  res.send(req.params);
});
// Static files
playgroundRouter.use(express.static("public"));

playgroundRouter.get("/shiftsPage", (req, res) => {
  fs.readFile("data/shifts.html", (er, buff) => {
    if (er) {
      console.log(er);
      res.send({
        code: 500,
        message: "Error getting the page",
      });
    } else {
      // const bufToString = buff.toString("utf-8");
      res.send(buff);
    }
  });
});

export default playgroundRouter;
