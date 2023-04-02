const model = require("../models/model");

function showTest(req, res) {
    model.getQuestion((err, questions) => {
        if (err) console.log(err);
        else {
            res.render("test", { questions })
        }
    })
}
 
module.exports = {
    showTest
}