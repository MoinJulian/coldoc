import express from "express";
import { nanoid } from "nanoid";

export const router = express.Router();

router.get("/", (_, res) => {
  res.render("home");
});

router.get("/document/:id", (req, res) => {
  const id = req.params.id;
  res.render("document", { id });
});

router.post("/new", (_, res) => {
  const id = nanoid(6);
  res.redirect(`/document/${id}`);
});
