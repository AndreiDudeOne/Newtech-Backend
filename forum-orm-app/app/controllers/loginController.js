import bcrypt from "bcrypt";
import loginService from "./../services/loginService.js";
import jwt from "jsonwebtoken";
import logger from "./../utils/logger.js";

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
    logger.info(`Logging user: ${body.username}`);
    const user = await loginService.getUserByUsername(body.username);

    if (!user || user.length === 0) {
      res.send(401, "The username or password was not correct");
    }

    logger.info(user, `User logged`);
    const userPw = user[0].password;
    // Verificare parola (comparare parola hashuita)
    bcrypt.compare(body.password, userPw, function (err, result) {
      if (result === true) {
        const data = {
          id: user[0]._id,
          username: user[0].username,
        };

        const token = jwt.sign(data, process.env.SECRET_KEY, {
          expiresIn: "7d",
        });

        logger.info({ user }, `User logged`);
        res.send(200, {
          status: 200,
          bearer: token,
        });
      } else {
        logger.error("User credentials are not correct");
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
