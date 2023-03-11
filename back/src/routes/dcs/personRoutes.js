const express = require("express")
const router = express.Router()
const PersonActions = require('../../controllers/persons')

router.get('/all', PersonActions.AllPersons);
router.get('/:id', PersonActions.GetPerson);
router.post('/add', PersonActions.AddPerson);
router.put('/:id', PersonActions.UpdatePerson);
router.delete('/:id', PersonActions.DeletePerson);

module.exports = router;