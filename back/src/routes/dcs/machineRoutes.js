const express = require("express")
const router = express.Router()
const MachineActions = require('../../controllers/machines')

router.get('/all', MachineActions.AllMachinesExisting);
router.get('/all/force', MachineActions.AllMachines);
router.get('/:id', MachineActions.GetMachine);
router.post('/add', MachineActions.AddMachine);
router.put('/:id', MachineActions.UpdateMachine);
router.delete('/:id', MachineActions.DeleteMachine);

module.exports = router;

