import fs from "fs";
import data from "./../data/data.json" assert { type: "json" };

const dataPathRelative = "./data/data.json";
const shiftsPagePathRelative = "./../data/shifts.html";

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
  let newShiftData = [...data];

  if (!shiftData || Object.keys(shiftData).length === 0) {
    res.status(400).send({
      status: 400,
      message: "Bad data request",
    });
    return;
  }

  newShiftData.push(shiftData);
  fs.writeFile(dataPathRelative, JSON.stringify(newShiftData), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        status: 500,
        message: "Error updating the shifts",
      });
    } else {
      res.send(shiftData);
    }
  });
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

  fs.writeFile(dataPathRelative, JSON.stringify(newShiftData), (err) => {
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

const getShiftsPage = (req, res) => {
  fs.readFile(shiftsPagePathRelative, (er, buff) => {
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
};

export default {
  getShifts,
  getShiftById,
  addShift,
  deleteShift,
  getShiftsPage,
};
