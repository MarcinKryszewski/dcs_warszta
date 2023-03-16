const express = require("express");
const router = express.Router();

const machineRoute = require('./Machines/machines.routes');
const partsStatusRoute = require('./PartsStatuses/partsstatuses.routes');
const personRoute = require('./Persons/persons.routes');
const roleRoute = require('./Roles/roles.routes');
const taskRoute = require('./Tasks/tasks.routes');
const tasksConfirms = require('./TasksConfirms/tasksconfirms.routes');

router.use('/', express.static('../front/build/'));
router.use('/machine', machineRoute);
router.use('/parts-status', partsStatusRoute);
router.use('/person', personRoute);
router.use('/role', roleRoute);
router.use('/task', taskRoute);
router.use('/tasks-confirm', tasksConfirms);

module.exports = router