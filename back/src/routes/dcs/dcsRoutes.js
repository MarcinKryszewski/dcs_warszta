const express = require("express")
const router = express.Router()  

const machineRoute = require('./machineRoutes');
const personRoute = require('./personRoutes');
const taskRoute = require('./taskRoutes')

router.use('/machine', machineRoute);
router.use('/person', personRoute);
router.use('/task', taskRoute);

module.exports = router