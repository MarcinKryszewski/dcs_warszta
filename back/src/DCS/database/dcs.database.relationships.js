const Task = require('../Tasks/tasks.model');
const Machine = require('../Machines/machines.model');
const Person = require('../Persons/persons.model');

console.log("RELATIONSHIP");

Task.belongsTo(Machine, {
    foreignKey: 'MachineId',
    as: 'Machine'
});

Task.belongsTo(Person, {
    foreignKey: 'AuthorId',
    as: 'Author'
});

Task.belongsTo(Person, {
    foreignKey: 'ResponsibleId',
    as: 'Responsible'
});

Machine.hasMany(Task, {
    foreignKey: 'MachineId',
    as: 'Machine'
});

Person.hasMany(Task, {
    foreignKey: 'AuthorId',
    as: 'Author'
});

Person.hasMany(Task, {
    foreignKey: 'ResponsibleId',
    as: 'Responsible'
});