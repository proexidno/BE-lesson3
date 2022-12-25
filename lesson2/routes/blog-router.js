const express = require("express");

const Router = express.Router();

Router.get("/", (req, res) => {
    res.render("blog.hbs")
});

Router.get("/:name", (req, res) => {
    var name = req.params.name;
    res.render("blog.hbs", {
        name: name,
        articles: [
            {
                title: "Запись1", 
                text: "текст"
            }
        ]
    })
});

module.exports = Router;