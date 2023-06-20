const express = require("express");
const router = express.Router();
const TaskActions = require("./tasks.api");

router.get("/all/force", TaskActions.AllTasks);
router.get("/all", TaskActions.AllTasksExisting);
router.get("/:id", TaskActions.GetTask);
router.get("/last/:id", TaskActions.LastTaskStatus);
router.post("/add", TaskActions.AddTask);
router.put("/:id", TaskActions.UpdateTask);
router.delete("/:id", TaskActions.DeleteTask);
router.post("/types", TaskActions.TaskTypes);

module.exports = router;
