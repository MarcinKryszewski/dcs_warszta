const Machine = require('../models/Machine');

class MachineActions {

    async AllMachines(req, res) {
        const machines = await Machine.findAll();
        res.status(200).send(machines);
    }

    async GetMachine(req, res) {
        const id = req.params.id;
        const machine = await Machine.findOne({ where: { Id: id }});
        res.status(200).json(machine);
    }

    async AddMachine(req, res) {
        const area = req.body.Area;
        const machineName = req.body.MachineName;
        const machine = Machine.build({
            Area: area,
            MachineName: machineName
        });
        await machine.save();
        res.status(200).send(machine);
    }

    async UpdateMachines(req, res) {
        const id = req.params.id;
        const machine = await Machine.findOne({ where: { Id: id }});
        machine.Area = req.body.Area;
        machine.MachineName = req.body.MachineName;
        await machine.save();
        res.status(201).json(machine);
    }

    async DeleteMachines(req, res) {
        const id = parseInt(req.params.id);
        await Machine.destroy({ where: { Id: id }});
        res.sendStatus(204);
    }
}

module.exports = new MachineActions();