const express =  require("express"), Router  = express.Router();

let gifts = {
    list: [
        {
            "name": "cup",
            "cost": "200-1000",
            "joy": "2-3/5"
        },
        {
            "name":  "sweet gift",
            "cost": "500-5000",
            "joy": "3-4/5"
        }
    ]
}

Router.get("/", (req, res) =>  {
    res.send("Все ок!")
})

Router.get("/gift", (req, res) => {
    res.json(gifts)
})

Router.get("/randoGift", (req, res) => {
    let item = gifts.list[Math.floor(Math.random() * gifts.list.length)];
    res.json(item)
})

module.exports = Router;