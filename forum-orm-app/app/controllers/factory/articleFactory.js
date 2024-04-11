const articleModelFactory = () => {};

export const articleResponseFactory = ({ article, comments }) => {
  return {
    article,
    comments,
  };
};
