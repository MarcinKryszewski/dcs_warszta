module.exports = {

    machines : "CREATE TABLE Machines ( \
        MachineId INTEGER NOT NULL UNIQUE, \
        Area INTEGER NOT NULL, \
        Machine INTEGER, \
        PRIMARY KEY(MachineId AUTOINCREMENT) \
    )",
    
    partsStatuses : "CREATE TABLE PartsStatuses ( \
        PartsStatusId	INTEGER NOT NULL UNIQUE, \
        Task	INTEGER NOT NULL, \
        Status	TEXT NOT NULL, \
        Date	TEXT NOT NULL, \
        Person	INTEGER NOT NULL, \
        PRIMARY KEY(PartsStatusId AUTOINCREMENT), \
        FOREIGN KEY(Person) REFERENCES Persons(PersonId) \
    )",
    
    persons : "CREATE TABLE Persons ( \
        PersonId	INTEGER NOT NULL UNIQUE, \
        Name	TEXT NOT NULL, \
        Surname	TEXT NOT NULL, \
        Login	TEXT, \
        PRIMARY KEY(PersonId AUTOINCREMENT) \
    )",
    
    tasks : "CREATE TABLE Tasks ( \
        TaskId	INTEGER NOT NULL UNIQUE, \
        Description	TEXT NOT NULL, \
        Category	TEXT NOT NULL, \
        Priority	TEXT NOT NULL DEFAULT 'C', \
        CreationDate	TEXT NOT NULL, \
        FinishDate	TEXT NOT NULL, \
        Author	INTEGER NOT NULL, \
        Machine	INTEGER NOT NULL, \
        Responsible	INTEGER NOT NULL, \
        PRIMARY KEY(TaskId AUTOINCREMENT), \
        FOREIGN KEY(Responsible) REFERENCES Persons(PersonId), \
        FOREIGN KEY(Author) REFERENCES Persons(PersonId), \
        FOREIGN KEY(Machine) REFERENCES Machines(MachineId) \
    )",
    
    taksConfirms : "CREATE TABLE TasksConfirms ( \
        TaskConfirm	INTEGER NOT NULL UNIQUE, \
        Task	INTEGER NOT NULL, \
        Status	TEXT NOT NULL, \
        Person	INTEGER NOT NULL, \
        Date	TEXT NOT NULL, \
        FOREIGN KEY(Task) REFERENCES Tasks(TaskId), \
        FOREIGN KEY(Person) REFERENCES Persons(PersonId), \
        PRIMARY KEY(TaskConfirm AUTOINCREMENT) \
    )",
}

