import fs from "fs";

const DATA_BOOKS_LOCATION = "./data/books.json";

const responseErrorHandle = (res, status, message) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(message);
};

const responseSuccessHandle = (res, responseData) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  if (responseData) {
    console.log("response Data", responseData);
    res.end(JSON.stringify(responseData));
  } else {
    res.end();
  }
};

const updateBooksFileResponse = (
  fileDataToChange,
  errMessage,
  responseData,
  errorStatusCode,
  res
) => {
  fs.writeFile(DATA_BOOKS_LOCATION, JSON.stringify(fileDataToChange), (err) => {
    if (err) {
      responseErrorHandle(res, errorStatusCode, errMessage);
    } else {
      responseSuccessHandle(res, responseData);
    }
  });
};

export { responseErrorHandle, updateBooksFileResponse };
