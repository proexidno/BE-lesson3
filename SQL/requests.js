const sqlite3 = require("sqlite3");


let db = new sqlite3.Database("warehouse.db", (e) => {
    if (e) {
        logger(e)
    } else {
        console.log("\nDB is started and running\n");
    }
});

function logger(e) {
    console.log(`\nERROR occured:\n${e}\n`);
}

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS parts (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        price INTEGER NOT NULL
    )
    `)
    db.run(`
    CREATE TABLE IF NOT EXISTS providers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        lastname TEXT,
        adress TEXT NOT NULL
    )
    `)
    db.run(`
    CREATE TABLE IF NOT EXISTS storage (
        id INTEGER PRIMARY KEY,
        is_in_storage BOOL NOT NULL,
        count INTEGER,
        part_id INTEGER,
        provider_id INTEGER,
        FOREIGN KEY (part_id) REFERENCES parts (id),
        FOREIGN KEY (provider_id) REFERENCES providers (id)
    )
    `)
    
})

db.run(`SELECT "Hello world"`)

db.close();

