const sqlite3 = require("sqlite3").verbose();

function getQuestion(callback) {
    let db = new sqlite3.Database("./questions.sqlite3")
    let query = `select * from questions`

    db.all(query, (err, rows) => {
        if (err) callback(err, null)
        else {
            callback(null, rows)
        }

        db.close()
    })
}

module.exports = {
    getQuestion
}