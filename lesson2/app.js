const express = require("express"), app = express();

const PORT = 3000, URL = "127.0.0.1";


app.use(express.static(__dirname + "/static"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/mainPage.html");
});

app.use((req, res, next) => {
    var pages = ["/about", "/gallery", "/contact", "/square"];
    var link = req.path;
    if (pages.includes(link)) {
        res.sendFile(`${__dirname}/public${link + "Page"}.html`);
    } else {
        next();
    }
});

app.get("/test/:id", (req,  res) => {
    var id = req.params.id
    res.send(id)
})

app.get("/square/:handler", (req,  res) => {
    var handler = req.params.handler
    if (isNaN(handler))  {
        res.send(handler + handler)
    }  else {
        res.send(String(Number(handler) * Number(handler)));
    }
})

app.use((req, res, next) => {
    res.status(404).send("А, что?");
});


app.listen(PORT, URL, (err) => {
    if (err) {console.log(err);}
    else {console.log(`The server is started on http://${URL}:${PORT}`);}
});