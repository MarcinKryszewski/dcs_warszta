const express = require("express")
const router = express.Router()
const MachineActions = require('../../controllers/machines')

router.get('/all', MachineActions.AllMachines);
router.get('/:id', MachineActions.GetMachine);
router.post('/add', MachineActions.AddMachine);
router.put('/:id', MachineActions.UpdateMachines);
router.delete('/:id', MachineActions.DeleteMachines);

module.exports = router;

/*
app.post('/machines', async (req, res) => {
    console.log(req.body);
    await Machine.create(req.body);
    res.send('Machine added to DB');
  })

  */