const Task = require('./Task');
const Machine = require('./Machine');
const Person = require('./Person');

console.log("RELATIONSHIP");

Task.belongsTo(Machine, {
    foreignKey: 'MachineId',
    as: 'Machine'
});

Machine.hasMany(Task, {
    foreignKey: 'MachineId',
    as: 'Machine'
});

Task.belongsTo(Person, {
    foreignKey: 'AuthorId',
    as: 'Author'
});

Person.hasMany(Task, {
    foreignKey: 'AuthorId',
    as: 'Author'
});

Task.belongsTo(Person, {
    foreignKey: 'ResponsibleId',
    as: 'Responsible'
});

Person.hasMany(Task, {
    foreignKey: 'ResponsibleId',
    as: 'Responsible'
});