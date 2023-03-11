const Task = require('../models/Task');

class TaskActions {

    async AllTasks(req, res) {
        const tasks = await Task.findAll();
        res.status(200).send(tasks);
    }

    async GetTask(req, res) {
        const id = req.params.id;
        const task = await Task.findOne({ where: { Id: id }});
        res.status(200).json(task);
    }

    async AddTask(req, res) {
        const description = req.body.Description;
        const category = req.body.Category;
        const priority = req.body.Priority;
        const creationDate = req.body.CreationDate;
        const finishDate = req.body.FinishDate;
        const author = req.body.Author;
        const machine = req.body.Machine;
        const responsible = req.body.Responsible;
        const task = Task.build({
            Id: null,
            Description : description,
            Category : category,
            Priority : priority,
            CreationDate : creationDate,
            FinishDate : finishDate,
            Author : author,
            Machine : machine,
            Responsible : responsible
        });
        await task.save();
        res.status(200).send(task);
    }

    async UpdateTask(req, res) {
        const id = req.params.id;
        const task = await Task.findOne({ where: { Id: id }});

        task.Description = req.body.Description;
        task.Category = req.body.Category;
        task.Priority = req.body.Priority;
        task.CreationDate = req.body.CreationDate;
        task.FinishDate = req.body.FinishDate;
        task.Author = req.body.Author;
        task.Machine = req.body.Machine;
        task.Responsible = req.body.Responsible;

        await task.save();
        res.status(201).json(task);
    }

    async DeleteTask(req, res) {
        const id = parseInt(req.params.id);
        await Task.destroy({ where: { Id: id }});
        res.sendStatus(204);
    }
}

module.exports = new TaskActions();