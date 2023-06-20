const Task = require("./tasks.model");
const Machine = require("../Machines/machines.model");
const Person = require("../Persons/persons.model");
const TaskConfirm = require("../TasksConfirms/tasksconfirms.model");
const TasksConfirmAPI = require("../TasksConfirms/tasksconfirms.api");

class TaskActions {
  async AllTasks(req, res) {
    const tasks = await Task.findAll({
      include: [
        {
          model: Machine,
          as: "Machine",
        },
        {
          model: Person,
          as: "Author",
        },
        {
          model: Person,
          as: "Responsible",
        },
      ],
    });

    res.status(200).send(tasks);
  }

  async AllTasksExisting(req, res) {
    const tasks = await Task.findAll({
      where: { Delete: 0 },
      include: [
        {
          model: Machine,
          as: "Machine",
        },
        {
          model: Person,
          as: "Author",
        },
        {
          model: Person,
          as: "Responsible",
        },
      ],
    });
    res.status(200).send(tasks);
  }

  async GetTask(req, res) {
    const id = req.params.id;
    const task = await Task.findOne({
      where: { Id: id },
      include: [
        {
          model: Machine,
          as: "Machine",
        },
        {
          model: Person,
          as: "Author",
        },
        {
          model: Person,
          as: "Responsible",
        },
      ],
    });
    res.status(200).json(task);
  }
  //Id: null,
  async AddTask(req, res) {
    const date = new Date();
    const description = req.body.Description;
    const category = req.body.Category;
    const priority = req.body.Priority;
    const creationDate = date;
    const finishDate = req.body.FinishDate;
    const author = req.body.AuthorId;
    const machine = req.body.MachineId;
    const responsible = req.body.ResponsibleId;
    const task = Task.build(
      {
        Description: description,
        Category: category,
        Priority: priority,
        CreationDate: creationDate,
        FinishDate: finishDate,
        AuthorId: author,
        MachineId: machine,
        ResponsibleId: responsible,
        LastStatus: "W TRAKCIE",
        PartsStatus: "W TRAKCIE",
      },
      { isNewRecord: true }
    );
    await task.save({ omitNull: true });
    const taskConfirm = {
      TaskId: task.null,
      Status: "START",
      PersonId: author,
    };
    TasksConfirmAPI.AddTaskConfirmToTask(taskConfirm);
    res.status(200).send(task);
  }

  async UpdateTask(req, res) {
    const id = req.params.id;
    const task = await Task.findOne({ where: { Id: id } });

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
    const task = await Task.findOne({ where: { Id: id } });
    task.Delete = true;
    task.DeleteDate = new Date().toJSON().slice(0, 10);
    await task.save();
    res.sendStatus(204);
  }

  async LastTaskStatus(req, res) {
    const id = parseInt(req.params.id);
    console.log(id);
    const taskStatus = await TaskConfirm.findOne({
      where: { TaskId: id },
      order: [
        ["Date", "DESC"],
        ["Id", "DESC"],
      ],
    });
    res.status(200).json(taskStatus);
  }

  async TaskTypes(req, res) {
    const tasksTypes = ["TAG", "RCFA", "AWARIA", "DCS", "CILT", "POREMONTOWE"];

    res.status(200).send(tasksTypes);
  }
}

module.exports = new TaskActions();
