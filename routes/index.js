const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");

let routes = (app) => {
  app.get("/", (req, res) => res.status(200).send("Welcome to Karibu!!"));
  router.post("/upload", uploadController.uploadFiles);
  router.get("/files", uploadController.getListFiles);

  router.get("/files/:name", uploadController.download);

  return app.use("/", router);
};

module.exports = routes;
