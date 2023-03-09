const express = require('express');
const app = express();
const {port} = require('./config');
//const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('testsqlite');

db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)");

    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        console.log(row.id + ": " + row.info);
    });
});

db.close();

// db
//require('./db/mongoose');

//parsers
app.use(bodyParser.json());

//fix cors
app.use(cors());

// routes
//app.use('/api/', apiRouter);

// server
app.listen(port, function(){
    console.log('serwer słucha... http://localhost:' + port);
});