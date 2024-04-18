import articlesService from "../services/articlesService.js";
import responses from "./../utils/responses.js";

const getFeed = async (req, res) => {
  const userTokenData = req.tokenData;

  // Sa contina articole nu ale noastre
  try {
    const articles = await articlesService.getFullArticlesForFeed(
      userTokenData.id
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
  console.log(userTokenData);
  try {
    const articles = await articlesService.getFullArticlesForFeed(
      userTokenData.id
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
