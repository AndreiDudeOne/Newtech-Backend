import aggregates from "../services/aggregates/index.js";
import responses from "./../utils/responses.js";

const getFeed = async (req, res) => {
  const userTokenData = req.tokenData;
  const params = req.query;
  const filterObject = {};

  if (params.content) {
    filterObject.content = params.content;
  }

  if (params.keywords?.length > 0) {
    filterObject.keywords = Array.isArray(params.keywords)
      ? params.keywords
      : [params.keywords];
  }

  // Sa contina articole nu ale noastre
  try {
    const articles = await aggregates.getFullArticlesForFeed(
      userTokenData.id,
      false,
      filterObject
    );

    res.send({
      status: 200,
      data: articles,
      count: articles.length,
    });
  } catch (e) {
    responses.responseGenericServerError(res, e);
  }
};

const getUserFeed = async (req, res) => {
  const userTokenData = req.tokenData;
  // console.log(userTokenData);
  try {
    const articles = await aggregates.getFullArticlesForFeed(
      userTokenData.id,
      true
    );

    console.log(articles);
    res.send({
      status: 200,
      data: articles,
      count: articles.length,
    });
  } catch (e) {
    responses.responseGenericServerError(res, e);
  }
};

export default {
  getFeed,
  getUserFeed,
};
