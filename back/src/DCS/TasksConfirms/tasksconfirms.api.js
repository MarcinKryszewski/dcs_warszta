const TasksConfirm = require('./tasksconfirms.model');
const Task = require('../Tasks/tasks.model');
const Person = require('../Persons/persons.model');

class TasksConfirmActions {

    async AllTasksConfirms(req, res) {
        const tasksConfirms = await TasksConfirm.findAll({
            include: [{
                model: Task,
                as: 'Task'
            },
            {
                model: Person,
                as: 'Person'
            }]
        });
        res.status(200).send(tasksConfirms);
    }

    async GetTasksConfirm(req, res) {
        const id = req.params.id;
        const tasksConfirm = await TasksConfirm.findOne({ where: { Id: id },
            include: [{
                model: Task,
                as: 'Task'
            },
            {
                model: Person,
                as: 'Person'
            }]});
        res.status(200).json(tasksConfirm);
    }

    async AddTasksConfirm(req, res) {
        const taskId = req.body.TaskId;
        const status = req.body.Status;
        const personId = req.body.PersonId;
        const date = req.body.Date;

        console.log(taskId);
        console.log(status);
        console.log(personId);
        console.log(date);

        const tasksConfirm = TasksConfirm.build({
            Id: null,
            TaskId: taskId,
            Status: status,
            PersonId: personId,
            Date: date
        });
        console.log(tasksConfirm);
        await tasksConfirm.save();
        res.status(200).send(tasksConfirm);
    }

    async UpdateTasksConfirm(req, res) {
        const id = req.params.id;
        const tasksConfirm = await TasksConfirm.findOne({ where: { Id: id }});
        tasksConfirm.TaskId = req.body.TaskId;
        tasksConfirm.Status = req.body.Status;
        tasksConfirm.PersonId = req.body.PersonId;
        tasksConfirm.Date = req.body.Date;
        await tasksConfirm.save();
        res.status(201).json(tasksConfirm);
    }

    async DeleteTasksConfirm(req, res) {
        const id = parseInt(req.params.id);
        const tasksConfirm = await TasksConfirm.findOne({ where: { Id: id }});
        await tasksConfirm.destroy();
        res.sendStatus(204);
    }
}

module.exports = new TasksConfirmActions();