import Article from "../../models/article.js";

const getFullArticlesForFeed = async (
  userId,
  filterOnlyForUser = false,
  filterObject,
  limit = 10
) => {
  const filterArticleObject = {
    userId: filterOnlyForUser ? userId : { $ne: userId },
  };

  if (filterObject.content && filterObject.content.trim().length > 0) {
    filterArticleObject["$text"] = { $search: filterObject.content };
  }

  if (filterObject.keywords?.length > 0) {
    filterArticleObject["keywords"] = { $in: [...filterObject.keywords] };
  }

  return Article.aggregate([
    {
      $match: filterArticleObject,
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
      $limit: limit,
    },
  ]);
};

export default { getFullArticlesForFeed };
