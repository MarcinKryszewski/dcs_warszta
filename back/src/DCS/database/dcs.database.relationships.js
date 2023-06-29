const Machine = require("../Machines/machines.model");
const PartsStatus = require("../PartsStatuses/partsstatuses.model");
const Person = require("../Persons/persons.model");
const Role = require("../Roles/roles.model");
const Task = require("../Tasks/tasks.model");
const TasksConfirm = require("../TasksConfirms/tasksconfirms.model");

//Machine.hasMany(Task);
//Person.hasMany(Task);
//Person.hasMany(Task);
//Person.hasMany(PartsStatus);
//Person.hasMany(TasksConfirm);
//Role.hasMany(Person);
//Task.hasMany(PartsStatus);
//Task.hasMany(TasksConfirm);

TasksConfirm.belongsTo(Task, {
  foreignKey: "TaskId",
  as: "Task",
});
TasksConfirm.belongsTo(Person, {
  foreignKey: "PersonId",
  as: "Person",
});
PartsStatus.belongsTo(Person, {
  foreignKey: "PersonId",
  as: "Person",
});
PartsStatus.belongsTo(Task, {
  foreignKey: "TaskId",
  as: "Task",
});
Person.belongsTo(Role, {
  foreignKey: "RoleID",
  as: "Role",
});
Task.belongsTo(Machine, {
  foreignKey: "MachineId",
  as: "Machine",
});
Task.belongsTo(Person, {
  foreignKey: "ResponsibleId",
  as: "Responsible",
});
Task.belongsTo(Person, {
  foreignKey: "AuthorId",
  as: "Author",
});
