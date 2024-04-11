export const createCommentFactory = ({ content, userId, articleId }) => {
  return {
    content,
    date: new Date(),
    userId,
    articleId,
  };
};
