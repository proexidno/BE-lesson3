const express = require("express"), path = require("path");

const Router = express.Router();

Router.get("/:id", (req, res) => {
    var id = req.params.id;
    res.send(id);
});

module.exports = Router;