const Person = require('./persons.model');

class PersonActions {

    async AllPersons(req, res) {
        const persons = await Person.findAll();
        res.status(200).send(persons);
    }

    async AllPersonsExisting(req, res) {
        const persons = await Person.findAll({ where: { Delete : 0}});
        res.status(200).send(persons);
    }

    async GetPerson(req, res) {
        const id = req.params.id;
        const person = await Person.findOne({ where: { Id: id }});
        res.status(200).json(person);
    }

    async AddPerson(req, res) {
        const name = req.body.Name;
        const surname = req.body.Surname;
        const login = req.body.Login;
        const person = Person.build({
            Id: null,
            Name : name,
            Surname : surname,
            Login : login
        });
        await person.save();
        res.status(200).send(person);
    }

    async UpdatePerson(req, res) {
        const id = req.params.id;
        const person = await Person.findOne({ where: { Id: id }});

        person.Name = req.body.Name;
        person.Surname = req.body.Surname;
        person.Login = req.body.Login;

        await person.save();
        res.status(201).json(person);
    }

    async DeletePerson(req, res) {
        const id = parseInt(req.params.id);
        const person = await Person.findOne({ where: { Id: id }});
        person.Delete = true;
        person.DeleteDate = new Date().toJSON().slice(0, 10);
        await person.save();
        res.sendStatus(204);
    }
}

module.exports = new PersonActions();