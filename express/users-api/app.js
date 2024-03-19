import express from "express";
import data from "./data/data.json" assert { type: "json" };
import fs from "fs";

const PORT = 3002;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/users", (req, res) => {
  console.log(req.headers);
  console.log(req.url);
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  res.status(200).send({ respMessage: "Request was received correctly" });
});
app.post("/addUser", (req, res) => {
  console.log(req.body, "Body");
  const userData = req.body;
  res.send(userData);
});

app.get("/getHtmlData", (req, res) => {
  res.end("<html><p>Hello dear!</p></html>");
});

app.get("/getJsonData", (req, res) => {
  res.send({
    name: "Michael",
    surname: "Jordan",
    number: 23,
  });
});

// app.get("/api/:var", (req, res) => {
//   res.send(req.params);
// });
app.get("/api/generic/:var/:var2", (req, res) => {
  res.send(req.params);
});
// Static files
app.use(express.static("public"));
app.get("/shiftsPage", (req, res) => {
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

// Shifts Routing
const getShifts = (req, res) => {
  res.send(data);
};

const getShiftById = (req, res) => {
  const { id } = req.params;
  const filteredShift = data.find((shift) => {
    return shift.id === parseFloat(id);
  });

  if (!filteredShift) {
    res.status(404);
    res.send({
      status: 404,
      message: "The resource has not been found",
    });
  }

  res.send(filteredShift);
};

const addShift = (req, res) => {
  const shiftData = req.body;
  let newShiftData = [];

  if (!shiftData || Object.keys(shiftData).length === 0) {
    res.status(400).send({
      status: 400,
      message: "Bad data request",
    });
    return;
  }

  if (shiftData && Object.keys(shiftData).length > 0) {
    fs.writeFile("data/data.json", JSON.stringify(newShiftData), (err) => {
      if (err) {
        res.status(500).send({
          status: 500,
          message: "Error updating the shifts",
        });
      } else {
        res.send(shiftData);
      }
    });
  }

  res.send(shiftData);
};

const deleteShift = (req, res) => {
  const { id } = req.params;

  if (typeof parseFloat(id) !== "number") {
    res.status(400).send({
      status: 400,
      message: "Bad request data",
    });
    return;
  }

  const newShiftData = data.filter((shift) => {
    return shift.id !== parseFloat(id);
  });

  if (newShiftData.length === data.length) {
    res.status(400).send({
      status: 400,
      message: "No shift was found",
    });
    return;
  }

  fs.writeFile("data/data.json", JSON.stringify(newShiftData), (err) => {
    if (err) {
      res.status(500).send({
        status: 500,
        message: "Error updating the shifts",
      });
    } else {
      res.end();
    }
  });
};

app.get("/api/shifts", getShifts);
app.get("/api/shifts/:id", getShiftById);
app.post("/api/shifts", addShift);
app.delete("/api/shifts/:id", deleteShift);
