const express = require('express');
const app = express();
const { hostname, port } = require('./src/configs/server.config');
const dcsRelationships =  require('./src/DCS/database/dcs.database.relationships');

// db
const dcsDatabase = require('./src/DCS/database/dcs.database.sqlite');
dcsDatabase.sync().then(() => console.log('Database connected'));

//parsers
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//fix cors
const cors = require('cors');
app.use(cors());

// routes
const dcsRoute = require('./src/DCS/dcs.routes');
app.use('/dcs', dcsRoute);

// server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });