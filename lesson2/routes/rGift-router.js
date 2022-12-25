const express = require("express"), path = require("path");

const Router = express.Router();

Router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'randomGiftPage.html'));
});

module.exports = Router;