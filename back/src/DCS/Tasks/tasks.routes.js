const express = require("express")
const router = express.Router()
const TaskActions = require('./tasks.api')

router.get('/all', TaskActions.AllTasks);
router.get('/:id', TaskActions.GetTask);
router.post('/add', TaskActions.AddTask);
router.put('/:id', TaskActions.UpdateTask);
router.delete('/:id', TaskActions.DeleteTask);

module.exports = router;