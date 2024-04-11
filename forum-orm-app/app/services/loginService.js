import User from "../models/user.js";

const getUserByUsername = async (username) => {
  return User.find({
    username,
  });
};

export default {
  getUserByUsername,
};
