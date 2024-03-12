import http from "http";
import fs from "fs";
import { v4 } from "uuid";

import books from "./data/books.json" assert { type: "json" };

const DATA_BOOKS_LOCATION = "./data/books.json";
const PORT = "8080";

const server = http.createServer((req, res) => {
  const method = req.method;
  const urlPath = req.url.split("/").slice(1)[0];

  if (method === "GET") {
    if (urlPath === "getBooks") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify([...books]));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end("Not found");
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
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end("Object data was not sufficient");
          return;
        }

        fs.writeFile(
          DATA_BOOKS_LOCATION,
          JSON.stringify(newBooksList),
          (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end("Server error adding the book");
            } else {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(bookRequestData));
            }
          }
        );
      });
    }
  }

  if (method === "PUT") {
  }

  if (method === "DELETE") {
  }
});

server.listen(PORT);
