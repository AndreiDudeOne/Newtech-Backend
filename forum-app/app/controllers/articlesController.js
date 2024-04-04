import articlesService from "./../services/articlesService.js";

const createArticle = async (req, res) => {
  const data = req.body;
  const userData = req.tokenData;

  if (!data.content) {
    res.send(401, "No content provided");
    return;
  }
  const article = {
    content: data.content,
    date: new Date(),
    keywords: data.keywords?.length ? data.keywords : [],
    userId: userData.id,
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
    res.send(500, "There was an service error");
  }
};

export default {
  createArticle,
};
