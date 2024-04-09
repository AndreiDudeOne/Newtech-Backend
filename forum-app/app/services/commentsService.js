import db from "./../config/db.js";

const addComment = async (comment) => {
  const collections = await db.getDb();

  return collections.comments.insertOne(comment);
};

const getCommentById = async (id) => {
  const collections = await db.getDb();

  return collections.comments.find({ _id: id }).toArray();
};

const getCommentsByArticleId = async (articleId) => {
  console.log(articleId);
  const collections = await db.getDb();
  return collections.comments.find({ articleId: articleId }).toArray();
};

export default {
  addComment,
  getCommentById,
  getCommentsByArticleId,
};
