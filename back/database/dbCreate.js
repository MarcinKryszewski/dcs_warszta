const sqlite3 = require('sqlite3').verbose();
const { databaseName } = require('../config');
const tableSQL = require('./tablesSQL');

const db = new sqlite3.Database('./database/' + databaseName + '.sqlite3');

db.run(tableSQL.machines);
db.run(tableSQL.partsStatuses);
db.run(tableSQL.persons);
db.run(tableSQL.tasks);
db.run(tableSQL.taksConfirms);