const Task = require('./tasks.model');
const Machine = require('../Machines/machines.model');
const Person = require('../Persons/persons.model')

class TaskActions {

    async AllTasks(req, res) {
        const tasks = await Task.findAll({ 
            include: [{
                model: Machine,
                as: 'Machine'
            }, {
                model: Person,
                as: 'Author'
            }, {
                model: Person,
                as: 'Responsible'
            }
            ]
            //include: Person
        });
        res.status(200).send(tasks);
    }

    async AllTasksExisting(req, res) {
        const tasks = await Task.findAll({ where: { Delete : 0}});
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
        const author = req.body.AuthorId;
        const machine = req.body.MachineId;
        const responsible = req.body.ResponsibleId;
        const task = Task.build({
            Id: null,
            Description : description,
            Category : category,
            Priority : priority,
            CreationDate : creationDate,
            FinishDate : finishDate,
            AuthorId : author,
            MachineId : machine,
            ResponsibleId : responsible
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
        task.AuthorId = req.body.Author;
        task.MachineId = req.body.Machine;
        task.ResponsibleId = req.body.Responsible;

        await task.save();
        res.status(201).json(task);
    }

    async DeleteTask(req, res) {
        const id = parseInt(req.params.id);
        const task = await Task.findOne({ where: { Id: id }});
        task.Delete = true;
        task.DeleteDate = new Date().toJSON().slice(0, 10);
        await task.save();
        res.sendStatus(204);
    }
}

module.exports = new TaskActions();