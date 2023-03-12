const { Sequelize } = require('sequelize');
const sqlite3 = require('sqlite3').verbose();
const { databaseName, databasePath } = require('../dcs.db.config');
const fs = require('fs');
const dbPath = databasePath + databaseName + '.sqlite3';

fs.access(dbPath, fs.constants.F_OK, (err) => {
    if (err) {
        console.log("Creating database");
        const db = require('./dcs.database.create');
      } else {        
        const db = new sqlite3.Database(dbPath);
      }
  });

  const sequelize = new Sequelize(databaseName, 'user', 'password', {
    dialect: 'sqlite',
    host: dbPath
  })

  module.exports = sequelize;