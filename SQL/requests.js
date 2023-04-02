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

function dbDeploy() {

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
        db.run(`
        CREATE TABLE IF NOT EXISTS new_parts (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            price INTEGER NOT NULL,
            new_price INTEGER NOT NULL
        )
        `)
        db.run(`
        CREATE TABLE IF NOT EXISTS missing_parts (
            id INTEGER PRIMARY KEY,
            part_id INTEGER,
            provider_id INTEGER
        )
        `)
    })

}

function query1() {

    db.all(`
    select id from parts
    where price > (
        select avg(price) from parts
    )    
    `, []
        , (e, rows) => {
            if (e) {
                console.log(e);
                return
            }
            console.log(rows.length);
    })

}

function query2() {

    db.all(`
    select (count * 100) / (
        select SUM(count) from storage
    ) as percentage from storage
    `, []
        , (e, rows) => {
            if (e) {
                console.log(e);
                return
            }
            rows.forEach(row => {
                console.log(row);
            })
    })
    
}

function query3() {

}

function query4() {

}


query3()

db.close();