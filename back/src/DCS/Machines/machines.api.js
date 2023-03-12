const Machine = require('./machines.model');

class MachineActions {

    async AllMachines(req, res) {
        const machines = await Machine.findAll();
        res.status(200).send(machines);
    }

    async AllMachinesExisting(req, res) {
        const machines = await Machine.findAll({ where: { Delete : 0}});
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
            Id: null,
            Area: area,
            MachineName: machineName
        });
        console.log(machine);
        await machine.save();
        res.status(200).send(machine);
    }

    async UpdateMachine(req, res) {
        const id = req.params.id;
        const machine = await Machine.findOne({ where: { Id: id }});
        machine.Area = req.body.Area;
        machine.MachineName = req.body.MachineName;
        await machine.save();
        res.status(201).json(machine);
    }

    async DeleteMachine(req, res) {
        const id = parseInt(req.params.id);
        const machine = await Machine.findOne({ where: { Id: id }});
        machine.Delete = true;
        machine.DeleteDate = new Date().toJSON().slice(0, 10);
        await machine.save();
        res.sendStatus(204);
    }
}

module.exports = new MachineActions();