import db from "./../config/db.js";

const createArticle = async (article) => {
  const collections = await db.getDb();
  return collections.articles.insertOne(article);
};

const updateArticleById = async (id, newData) => {
  const collections = await db.getDb();
  return collections.articles.updateOne({ _id: id }, { $set: newData });
};

const updateArticleListElemById = async (id, prop, newData) => {
  const collections = await db.getDb();
  return collections.articles.updateOne(
    { _id: id },
    { $push: { [prop]: newData } }
  );
};

const getArticleById = async (articleId) => {
  const collections = await db.getDb();

  return collections.articles
    .find({
      _id: articleId,
    })
    .toArray();
};

const deleteArticleById = async (articleId) => {
  const collections = await db.getDb();

  return collections.articles.deleteOne({ _id: articleId });
};

export default {
  createArticle,
  getArticleById,
  updateArticleById,
  deleteArticleById,
  updateArticleListElemById,
};
