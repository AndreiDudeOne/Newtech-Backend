import db from "./../config/db.js";

const createArticle = async (article) => {
  const collections = await db.getDb();
  return collections.articles.insertOne(article);
};

const getArticleById = async (articleId) => {
  const collections = await db.getDb();

  return collections.articles
    .find({
      _id: articleId,
    })
    .toArray();
};

export default {
  createArticle,
  getArticleById,
};
