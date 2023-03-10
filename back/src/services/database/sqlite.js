const sqlite3 = require('sqlite3').verbose();
const { databaseName, databasePath } = require('../../configs/db.config')

const fs = require('fs');
const dbPath = databasePath + databaseName + '.sqlite3';

fs.access(dbPath, fs.constants.F_OK, (err) => {
    if (err) {
        console.log("no db");
        const db = require('./dbCreate');

      } else {        
        const db = new sqlite3.Database(dbPath);
        console.log('Database connected');

        /*db.each("SELECT name FROM sqlite_schema \
        WHERE type='table' \
        ORDER BY name;",
        (err, row) => {
            console.log(row.name);
        });*/
      }

  });
