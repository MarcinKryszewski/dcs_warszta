const sqlite3 = require('sqlite3').verbose();
const { databaseName, databasePath } = require('../../configs/db.config');
const tableSQL = require('./dcs.database.SQL');

const db = new sqlite3.Database(databasePath + databaseName + ".sqlite3");

db.run(tableSQL.machines);
db.run(tableSQL.partsStatuses);
db.run(tableSQL.persons);
db.run(tableSQL.tasks);
db.run(tableSQL.taksConfirms);