import commentsService from "../services/commentsService.js";
import articlesService from "./../services/articlesService.js";
import responses from "./../utils/responses.js";
import { articleResponseFactory } from "./factory/articleFactory.js";
import { ObjectId } from "mongodb";

const getArticle = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    responses.responseBadRequest(res, "No id provided");
    return;
  }

  try {
    const objectId = ObjectId.createFromHexString(id);
    const article = await articlesService.getArticleById(objectId);
    const comments = await commentsService.getCommentsByArticleId(id);
    const articleResp = articleResponseFactory({ article, comments });

    res.send(200, articleResp);
  } catch (error) {
    responses.responseNoContent(res, error);
  }
};

const createArticle = async (req, res) => {
  const data = req.body;
  const userTokenData = req.tokenData;

  if (!data.content) {
    responses.responseNoContent(res);
    return;
  }
  const article = {
    content: data.content,
    date: new Date(),
    keywords: data.keywords?.length ? data.keywords : [],
    userId: userTokenData.id,
    likes: [],
  };

  try {
    const response = await articlesService.createArticle(article);
    const data = await articlesService.getArticleById(response.insertedId);
    res.send(200, {
      status: 200,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    responses.responseGenericServerError(res);
  }
};

const updateArticle = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const userTokenData = req.tokenData;

  if (!id) {
    responses.responseBadRequest(res);
    return;
  }

  if (!data.content) {
    responses.responseNoContent(res);
    return;
  }

  try {
    const objectId = ObjectId.createFromHexString(id);
    const article = await articlesService.getArticleById(objectId);

    if (!_doesUserHavePermissionOnArticle(article, userTokenData)) {
      return;
    }

    await articlesService.updateArticleById(objectId, data);
    const updatedData = await articlesService.getArticleById(objectId);

    res.send(200, updatedData);
  } catch (e) {
    responses.responseGenericServerError(res);
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const userTokenData = req.tokenData;
  if (!id) {
    responses.responseBadRequest(res);
    return;
  }

  try {
    const objectId = ObjectId.createFromHexString(id);
    const article = await articlesService.getArticleById(objectId);
    if (!_doesUserHavePermissionOnArticle(article, userTokenData)) {
      return;
    }
    await articlesService.deleteArticleById(objectId);
    res.send(200);
  } catch (e) {
    responses.responseGenericServerError(res);
  }
};

const addLike = async (req, res) => {
  const { id } = req.params;
  const userTokenData = req.tokenData;

  if (!id) {
    responses.responseBadRequest(res, "No id provided");
    return;
  }

  try {
    const objectId = ObjectId.createFromHexString(id);
    const article = await articlesService.getArticleById(objectId);

    const likes = article[0].likes;

    if (likes.includes(userTokenData.id)) {
      responses.responseGenericServerError(res, "Article already liked");
      return;
    }

    await articlesService.updateArticleListElemById(
      objectId,
      "likes",
      userTokenData.id
    );

    res.send(200, "Data liked");
  } catch (error) {
    responses.responseGenericServerError(res, error);
  }
};

const _doesUserHavePermissionOnArticle = (article, userTokenData) => {
  if (
    !article &&
    article.length > 0 &&
    article[0].userId !== userTokenData.id
  ) {
    responses.responseGenericServerError(res);
    return false;
  }
  return true;
};

export default {
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  addLike,
};
