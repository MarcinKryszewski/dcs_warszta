const sqlite3 = require('sqlite3').verbose();
const { databaseName } = require('../config')

const fs = require('fs');
const dbPath = './database/' + databaseName + '.sqlite3';

fs.access(dbPath, fs.constants.F_OK, (err) => {
    if (err) {
        const db = require('./dbCreate');
      } else {
        const db = new sqlite3.Database(dbPath);

        /*db.each("SELECT name FROM sqlite_schema \
        WHERE type='table' \
        ORDER BY name;",
        (err, row) => {
            console.log(row.name);
        });*/
      }

  });
