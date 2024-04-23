import Article from "./../models/article.js";

const createArticle = async (article) => {
  return Article.create(article);
};

const updateArticleById = async (id, newData) => {
  return Article.findByIdAndUpdate(id, newData);
};

const updateArticleListElemById = async (id, prop, newData) => {
  return Article.updateOne({ _id: id }, { $push: { [prop]: newData } });
};

const getArticleById = async (articleId) => {
  return Article.findById(articleId);
};

const deleteArticleById = async (articleId) => {
  return Article.findByIdAndDelete(articleId);
};

const getArticlesForFeed = async (articleIdExcempt) => {
  return Article.find({ userId: { $ne: articleIdExcempt } });
};

const getArticlesForUser = async (userId) => {
  return Article.find({ userId: userId });
};

export default {
  createArticle,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  updateArticleListElemById,
  getArticlesForFeed,
  getArticlesForUser,
};
