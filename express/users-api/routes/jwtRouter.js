import express from "express";
import jwt from "jsonwebtoken";
import shifts from "./../data/shfits.json" assert { type: "json" };
import usersDb from "./../data/usersDb.json" assert { type: "json" };

const jwtRouter = express.Router();

const checkUserCredentialsMdw = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  const foundUser = usersDb.find((user) => {
    return user?.username === username && user?.password === password;
  });
  if (foundUser) {
    next();
  } else {
    res.send(404, "User not found!");
  }
};

const checkTokenValidityMdw = (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    const deserializedToken = jwt.verify(token, secret);
    if (deserializedToken) {
      req.deserializedToken = deserializedToken;
      next();
    }
  } catch (error) {
    res.send(404, "Problems with the token provided!");
  }
};

const secret = "SECRET KEY";

jwtRouter.get("/jwt", (req, res) => {
  const token = jwt.sign(data, secret, { expiresIn: "7d" });

  const verf = jwt.verify(token, secret);

  console.log(verf);
  res.send(token);
});

// Not restricted
jwtRouter.post("/user/login", checkUserCredentialsMdw, (req, res) => {
  const { username } = req.body;
  console.log("HERE");
  const user = usersDb.find((user) => {
    return username === user.username;
  });

  const tokenData = {
    userId: user.userId,
    username: user.username,
    roles: user.roles,
  };

  const token = jwt.sign(tokenData, secret, { expiresIn: "7d" });
  res.send({
    token,
  });
});

// Restricted only for non logged users
jwtRouter.get("/user/shifts", checkTokenValidityMdw, (req, res) => {
  const { userId } = req.deserializedToken;
  const shiftsFiltered = shifts.filter((shift) => {
    return shift.userId === userId;
  });
  res.send({
    resCode: 200,
    data: shiftsFiltered,
  });
});

// Restricted for non logged users and simple users (non admin)
jwtRouter.get("/user/allUsersShifts", (req, res) => {
  try {
    const deserializedToken = jwt.verify(token, secret);
    const { roles } = deserializedToken;

    if (roles.includes("ADMIN")) {
      res.send({
        resCode: 200,
        data: shifts,
      });
    } else {
      res.send(403, "Permission denied!");
    }
  } catch (error) {
    res.send(404, "Problems with the token provided!");
  }
});

export default jwtRouter;
