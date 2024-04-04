import bcrypt from "bcrypt";
import registerService from "./../services/registerService.js";

export default {
  register(req, res) {
    const body = req.body;

    if (!body.fullName || !body.username || !body.password) {
      res.send(400, {
        errStatus: 400,
        errMessage: "Request data was not sufficient!",
      });
    }

    const saltRounds = 8;
    bcrypt.hash(body.password, saltRounds, function (err, hash) {
      const user = {
        fullName: body.fullName,
        username: body.username,
        password: hash,
      };

      registerService.register(user).then((val) => {
        console.log("User added");
        res.send(200, {
          message: "User was added",
        });
      });
      // Store hash in your password DB.
    });
  },
};
