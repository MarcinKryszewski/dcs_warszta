const PartsStatus = require('./partsstatuses.model');
const Task = require('../Tasks/tasks.model');
const Person = require('../Persons/persons.model');

class PartsStatusActions {

    async AllPartsStatus(req, res) {
        const partsStatuss = await PartsStatus.findAll({
            include: [{
                model: Task,
                as: 'Task'
            },
            {
                model: Person,
                as: 'Person'
            }]
        });
        res.status(200).send(partsStatuss);
    }

    async GetPartsStatus(req, res) {
        const id = req.params.id;
        const partsStatus = await PartsStatus.findOne({ where: { Id: id },
            include: [{
                model: Task,
                as: 'Task'
            },
            {
                model: Person,
                as: 'Person'
            }]});
        res.status(200).json(partsStatus);
    }

    async AddPartsStatus(req, res) {
        const taskId = req.body.TaskId;
        const status = req.body.Status;
        const personId = req.body.PersonId;
        const date = req.body.Date;
        const partsStatus = PartsStatus.build({
            Id: null,
            TaskId: taskId,
            Status: status,
            PersonId: personId,
            Date: date
        });
        console.log(partsStatus);
        await partsStatus.save();
        res.status(200).send(partsStatus);
    }

    async UpdatePartsStatus(req, res) {
        const id = req.params.id;
        const partsStatus = await PartsStatus.findOne({ where: { Id: id }});
        partsStatus.TaskId = req.body.TaskId;
        partsStatus.Status = req.body.Status;
        partsStatus.PersonId = req.body.PersonId;
        partsStatus.Date = req.body.Date;
        await partsStatus.save();
        res.status(201).json(partsStatus);
    }

    async DeletePartsStatus(req, res) {
        const id = parseInt(req.params.id);
        const partsStatus = await PartsStatus.findOne({ where: { Id: id }});
        await partsStatus.destroy();
        res.sendStatus(204);
    }
}

module.exports = new PartsStatusActions();