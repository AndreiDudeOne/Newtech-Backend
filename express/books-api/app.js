import express from "express";

const PORT = 3002;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/users", (req, res) => {
  console.log(req.headers);
  console.log(req.url);
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  res.send({ respMessage: "Request was received correctly" });
});

app.post("/addUser", (req, res) => {
  console.log(req.body, "Body");
  const userData = req.body;
  res.send(userData);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
