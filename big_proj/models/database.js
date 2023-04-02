const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./questions.sqlite3", e => {
    if (e) { console.log(e); }
    else {
        console.log("\nDB is started and running\n");
    }
})

let query = `
    create table if not exists questions (
        id integer primary key autoincrement,
        question text not null,
        correct text not null,
        answer1 text not null,
        answer2 text not null,
        answer3 text not null,
        answer4 text not null
    )`

db.run(query, [], e => { if (e) console.log(e); else console.log("successful"); })

db.close()