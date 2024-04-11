import bcrypt from "bcrypt";
import registerService from "./../services/registerService.js";
import responses from "./../utils/responses.js";

const register = async (req, res) => {
  const body = req.body;

  if (!body.fullName || !body.username || !body.password) {
    responses.responseNoContent();
  }

  const saltRounds = 8;
  bcrypt.hash(body.password, saltRounds, async function (err, hash) {
    const user = {
      fullName: body.fullName,
      username: body.username,
      password: hash,
    };

    try {
      await registerService.register(user);
      res.send(200, {
        message: "User was added",
      });
    } catch (error) {
      responses.responseGenericServerError(res, error);
      console.log(error);
    }
  });
};

export default {
  register,
};
