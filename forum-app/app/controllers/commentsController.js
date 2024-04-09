import responses from "./../utils/responses.js";
import { createCommentFactory } from "./factory/commentFactory.js";
import commentsService from "../services/commentsService.js";

const addComment = async (req, res) => {
  const data = req.body;
  const userTokenData = req.tokenData;

  if (!data.content && !data.userId) {
    responses.responseNoContent(res);
    return;
  }

  try {
    const comment = createCommentFactory({
      content: data.content,
      userId: userTokenData.id,
      articleId: data.articleId,
    });

    const resp = await commentsService.addComment(comment);
    const newComment = await commentsService.getCommentById(resp.insertedId);
    res.send(200, newComment);
  } catch (error) {
    responses.responseGenericServerError();
  }
};

export default {
  addComment,
};
