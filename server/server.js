import express from "express";
import path from "path";
import { __dirname } from "./utils.js";

/**
 * Generates an express server
 * @param {express.Router} router
 * @return {import("http").Server}
 */
export function generateServer(router) {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "..", "pages"));

  app.use(express.static(path.join(__dirname, "..", "static")));
  app.use(router);

  return app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
