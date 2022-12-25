const express = require("express");

const Router = express.Router();

Router.get("/", (req, res) => {
    res.send("Тут будут блоги");
});

module.exports = Router;