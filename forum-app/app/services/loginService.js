import db from "./../config/db.js";

const getUserByUsername = async (username) => {
  const collections = await db.getDb();
  return collections.users
    .find({
      username,
    })
    .toArray();
};

export default {
  getUserByUsername,
};
