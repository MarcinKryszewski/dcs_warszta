const express = require("express")
const router = express.Router()
const RoleActions = require('./roles.api')

router.get('/all', RoleActions.AllRoles);
router.get('/:id', RoleActions.GetRole);
router.post('/add', RoleActions.AddRole);
router.put('/:id', RoleActions.UpdateRole);
router.delete('/:id', RoleActions.DeleteRole);

module.exports = router;