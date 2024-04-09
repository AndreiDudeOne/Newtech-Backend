function responseNoContent(res) {
  res.send(401, "No content provided");
}

function responseBadRequest(res, msg) {
  res.send(401, msg || "Bad request");
}

function responseGenericServerError(res, msg) {
  res.send(500, msg || "There was an service error");
}

export default {
  responseNoContent,
  responseBadRequest,
  responseGenericServerError,
};
