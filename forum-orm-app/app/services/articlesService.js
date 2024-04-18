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

const getFullArticlesForFeed = async (articleIdExcempt) => {
  return Article.aggregate([
    {
      $match: {
        userId: { $ne: articleIdExcempt }, // Filter articles where userId is not 'test'
      },
    },
    {
      $lookup: {
        from: "users",
        let: { userIdObj: { $toObjectId: "$userId" } },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$userIdObj"] } } },
          { $project: { _id: 0, username: 1 } },
        ],
        as: "author",
      },
    },
    {
      $lookup: {
        from: "comments",
        let: { articleId: { $toString: "$_id" } }, // Convert ObjectId _id to string
        pipeline: [
          { $match: { $expr: { $eq: ["$articleId", "$$articleId"] } } },
          {
            $lookup: {
              from: "users",
              let: { commentUserId: "$userId" }, // Define the variable for the user ID in the comment
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", { $toObjectId: "$$commentUserId" }],
                    },
                  },
                },
                { $project: { _id: 0, username: 1 } }, // Project only the username field
              ],
              as: "commentAuthor",
            },
          },
          { $unwind: "$commentAuthor" }, // Optional, depends on data model and requirements
        ],

        as: "comments",
      },
    },
    {
      $unset: "userId",
    },
    {
      $sort: { publishDate: -1 },
    },
    {
      $limit: 10,
    },
  ]);
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
  getFullArticlesForFeed,
};
