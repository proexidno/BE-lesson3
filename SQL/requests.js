const sqlite3 = require("sqlite3");
let db = new sqlite3.Database("test.db", (e) => {
    if (e) {
        logger(e)
    } else {
        console.log("\nDB is started and running\n");
    }
});

function logger(e) {
    console.log(`\nERROR occured:\n${e}\n`);
}


db.run('CREATE TABLE IF NOT EXISTS users (name TEXT, pass TEXT)');


db.run('INSERT INTO users (name, pass) VALUES (?, ?)', ["Софья", "admin1"], (e) => {
    if (e) {
        logger(e)
    } else {
        console.log("All's OK\n");
    }
})


db.close();

