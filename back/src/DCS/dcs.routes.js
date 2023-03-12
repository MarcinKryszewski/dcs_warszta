const express = require("express")
const router = express.Router()  

const machineRoute = require('./Machines/machines.routes');
const personRoute = require('./Persons/persons.routes');
const taskRoute = require('./Tasks/tasks.routes');
const partsStatusRoute = require('./PartsStatuses/partsstatuses.routes');
const tasksConfirms = require('./TasksConfirms/tasksconfirms.routes');

router.use('/machine', machineRoute);
router.use('/person', personRoute);
router.use('/task', taskRoute);
router.use('/parts-status', partsStatusRoute);
router.use('/tasks-confirm', tasksConfirms);

module.exports = router