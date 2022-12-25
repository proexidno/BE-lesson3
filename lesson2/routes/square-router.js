const express = require("express"), path = require("path");

const Router = express.Router();

Router.get("/:handler", (req, res) => {
    var handler = req.params.handler
    if (isNaN(handler))  {
        res.send(handler + handler)
    }  else {
        res.send(String(Number(handler) * Number(handler)));
    }
});

module.exports = Router;