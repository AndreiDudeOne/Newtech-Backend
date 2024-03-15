import http from "http";
import { v4 } from "uuid";

import books from "./data/books.json" assert { type: "json" };
import { responseErrorHandle, updateBooksFileResponse } from "./utils.js";

const PORT = "8081";

const server = http.createServer((req, res) => {
  const method = req.method;
  const urlPath = req.url.split("/").slice(1)[0];
  console.log(urlPath, req.url.split("/"));

  if (method === "GET") {
    if (urlPath === "getBooks") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify([...books]));
    } else {
      responseErrorHandle(res, 404, "Not found");
    }
  }

  if (method === "POST") {
    if (urlPath === "addBook") {
      let bookRequestData;

      req.on("data", (chunk) => {
        bookRequestData = JSON.parse(chunk.toString());
        bookRequestData.id = v4();
      });

      req.on("end", () => {
        const newBooksList = [...books, bookRequestData];

        if (!bookRequestData || !bookRequestData.book_name) {
          responseErrorHandle(res, 400, "Object data was not sufficient");
          return;
        }

        updateBooksFileResponse(
          newBooksList,
          "Server error adding the book",
          bookRequestData,
          500,
          res
        );
      });
    }
  }

  if (method === "PUT") {
    if (urlPath === "updateBook") {
      let bookRequestData;
      let newUpdatedBook;

      req.on("data", (chunk) => {
        bookRequestData = JSON.parse(chunk.toString());
      });

      req.on("end", () => {
        const bookIdToUpdate = bookRequestData?.id;
        const bookToUpdate = books.find((book) => {
          return book.id === bookIdToUpdate;
        });

        if (Object.keys(bookRequestData).length === 0) {
          responseErrorHandle(res, 400, "Object data was not sufficient");
          return;
        }

        if (!bookToUpdate) {
          responseErrorHandle(
            res,
            400,
            "There is no book with that ID present"
          );
          return;
        }

        const updatedBookList = books.map((book) => {
          if (book.id === bookIdToUpdate) {
            newUpdatedBook = {
              ...book,
              ...bookRequestData,
            };
            return {
              ...book,
              ...bookRequestData,
            };
          }
          return book;
        });

        updateBooksFileResponse(
          updatedBookList,
          "Server error updating the book",
          newUpdatedBook,
          400,
          res
        );
      });
    }
  }

  if (method === "DELETE") {
    if (urlPath === "deleteBook") {
      const bookParamId = req.url.split("/").at(-1);

      const filteredBooksList = books.filter((book) => {
        return book.id.toString() !== bookParamId;
      });

      updateBooksFileResponse(
        filteredBooksList,
        "Server error removing the book",
        "",
        400,
        res
      );
    }
  }
});

server.listen(PORT);
