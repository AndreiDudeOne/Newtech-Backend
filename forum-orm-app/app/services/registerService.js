import User from "./../models/user.js";

const register = async (user) => {
  return User.create({
    fullName: user.fullName,
    username: user.username,
    emailAddress: user.emailAddress,
    password: user.password,
  });
};

export default {
  register,
};
