const express = require("express")
const router = express.Router()  

const machineRoute = require('./Machines/machines.routes');
const personRoute = require('./Persons/person.routes');
const taskRoute = require('./Tasks/tasks.routes')

router.use('/machine', machineRoute);
router.use('/person', personRoute);
router.use('/task', taskRoute);

module.exports = router