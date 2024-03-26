import express from "express";
const sessionRouter = express.Router();

// Data
const users = [{ username: "Andrei", password: "user1pw", permission: [] }];

// Middleware
const checkUserExistentenceMdw = (req, res, next) => {
  const sessionUserObj = req.session?.user;
  const foundUser = users.find((user) => {
    return user.username === sessionUserObj?.username;
  });
  if (!foundUser) {
    res.send(403, "User access forbiden!");
  } else {
    next();
  }
};
const checkUserCredentialsMdw = (req, res, next) => {
  const { username, password } = req.body;
  const foundUser = users.find((user) => {
    return user?.username === username && user?.password === password;
  });
  if (foundUser) {
    next();
  } else {
    res.send(404, "User nout found");
  }
};

// Routes
sessionRouter.get("/sessionViews", (req, res) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  console.log(req.session);
  res.end("Session sent");
});

sessionRouter.post("/login", checkUserCredentialsMdw, (req, res) => {
  const { username } = req.body;
  req.session.user = {
    username: username,
  };
  res.end("Succesfull Login");
});

sessionRouter.get("/restricted", checkUserExistentenceMdw, (req, res) => {
  res.send({
    data: "Data has been correctly sent",
  });
});

export default sessionRouter;
