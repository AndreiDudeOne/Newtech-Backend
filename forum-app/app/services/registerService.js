import db from "./../config/db.js";

const register = async (user) => {
  console.log("Db collections Users");
  const userCollection = await db.connect();
  return userCollection.users.insertOne({
    fullName: user.fullName,
    username: user.username,
    emailAddress: user.emailAddress,
    password: user.password,
  });
};

export default {
  register,
};