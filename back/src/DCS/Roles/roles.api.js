const Role = require('./roles.model');

class RoleActions {

    async AllRoles(req, res) {
        const roles = await Role.findAll();
        res.status(200).send(roles);
    }

    async GetRole(req, res) {
        const id = req.params.id;
        const role = await Role.findOne({ where: { Id: id }});
        res.status(200).json(role);
    }

    async AddRole(req, res) {
        const name = req.body.Name;
        const role = Role.build({
            Id: null,
            Name: name
        });
        console.log(role);
        await role.save();
        res.status(200).send(role);
    }

    async UpdateRole(req, res) {
        const id = req.params.id;
        const role = await Role.findOne({ where: { Id: id }});
        role.Name = req.body.Name;
        await role.save();
        res.status(201).json(role);
    }

    async DeleteRole(req, res) {
        const id = parseInt(req.params.id);
        const role = await Role.findOne({ where: { Id: id }});
        await role.destroy();
        res.sendStatus(204);
    }
}

module.exports = new RoleActions();