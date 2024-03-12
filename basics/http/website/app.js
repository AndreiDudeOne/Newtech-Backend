import http from "http";
import path from "path";
import fs from "fs";

const PORT = 3002;
const __dirname = path.resolve();

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // const url = new URL(filePath);
  const filePathExtension = path.extname(filePath);
  let contentType = "text/html";
  switch (filePathExtension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".ico":
      console.log("ico");
      contentType = "image/x-icon";
      break;
    default:
      contentType = "text/html";
      break;
  }

  if (filePathExtension === ".ico") {
    res.writeHead(200, { "Content-Type": "image/x-icon" });
    res.end();
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>There was an error</h1>");
    } else {
      res.writeHead(200, {
        "Content-Type": contentType,
        "cache-control": "public, max-age=60",
      });
      res.write(data);
      res.end();
    }
  });
});
server.listen(PORT);
console.log(`Server started on port: ${PORT}`);
