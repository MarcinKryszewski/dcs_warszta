const express = require("express")
const router = express.Router()
const PersonActions = require('./persons.api')

router.get('/all', PersonActions.AllPersonsExisting);
router.get('/all/force', PersonActions.AllPersons);
router.get('/:id', PersonActions.GetPerson);
router.post('/add', PersonActions.AddPerson);
router.put('/:id', PersonActions.UpdatePerson);
router.delete('/:id', PersonActions.DeletePerson);

module.exports = router;