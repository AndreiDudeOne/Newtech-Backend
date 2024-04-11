import Comment from "./../models/comment.js";

const addComment = async (comment) => {
  return Comment.create(comment);
};

const getCommentById = async (id) => {
  return Comment.findById(id);
};

const getCommentsByArticleId = async (articleId) => {
  return Comment.findById(articleId);
};

export default {
  addComment,
  getCommentById,
  getCommentsByArticleId,
};
