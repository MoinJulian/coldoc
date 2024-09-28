import express from "express";
import path from "path";
import { __dirname } from "./utils.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/document/:id", (req, res) => {
  const id = req.params.id;
  res.render("document", { id });
});
