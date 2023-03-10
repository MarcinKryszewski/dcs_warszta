const express = require('express');
const app = express();
const { hostname, port } = require('./src/configs/server.config');
const bodyParser = require('body-parser');
const cors = require('cors');

// db
require('./src/services/database/sqlite');

//parsers
app.use(bodyParser.json());

//fix cors
app.use(cors());

// routes
const dcsRoute = require('./src/routes/dcs/dcs')
app.use('/dcs', dcsRoute);

// server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });