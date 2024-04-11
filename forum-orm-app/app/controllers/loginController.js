import bcrypt from "bcrypt";
import loginService from "./../services/loginService.js";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env-vars.js";

const login = async (req, res) => {
  // Preluare date din request
  const body = req.body;

  if (!body.username || !body.password) {
    res.send(400, {
      errStatus: 400,
      errMessage: "Request data was not sufficient!",
    });
  }

  try {
    // Cautam user in baza pe baza de username
    const user = await loginService.getUserByUsername(body.username);
    console.log(user, "User");
    if (!user || user.length === 0) {
      res.send(401, "The username or password was not correct");
    }
    const userPw = user[0].password;
    // Verificare parola (comparare parola hashuita)
    bcrypt.compare(body.password, userPw, function (err, result) {
      console.log(result);
      if (result === true) {
        const data = {
          id: user[0]._id,
          username: user[0].username,
        };

        const token = jwt.sign(data, SECRET_KEY, { expiresIn: "7d" });
        res.send(200, {
          status: 200,
          bearer: token,
        });
      } else {
        res.send(401, "The username or password was not correct");
      }
    });
  } catch (error) {
    res.send(500, "There was a problem with the server");
  }
};

export default {
  login,
};
