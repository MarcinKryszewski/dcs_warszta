const express = require("express")
const router = express.Router()
const TasksConfirmActions = require('./tasksConfirms.api')

router.get('/all', TasksConfirmActions.AllTasksConfirms);
router.get('/:id', TasksConfirmActions.GetTasksConfirm);
router.post('/add', TasksConfirmActions.AddTasksConfirm);
router.put('/:id', TasksConfirmActions.UpdateTasksConfirm);
router.delete('/:id', TasksConfirmActions.DeleteTasksConfirm);

module.exports = router;