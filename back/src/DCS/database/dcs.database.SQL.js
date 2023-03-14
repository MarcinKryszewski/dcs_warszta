module.exports = {

    machines : "CREATE TABLE Machines ( \
        Id INTEGER NOT NULL UNIQUE, \
        Area TEXT NOT NULL, \
        MachineName TEXT NOT NULL, \
        Delete INTEGER NOT NULL DEFAULT 0, \
        DeleteDate TEXT, \
        PRIMARY KEY(Id AUTOINCREMENT) \
    )",
    
    partsStatuses : "CREATE TABLE PartsStatuses ( \
        Id INTEGER NOT NULL UNIQUE, \
        TaskId INTEGER NOT NULL, \
        Status TEXT NOT NULL, \
        Date TEXT NOT NULL, \
        PersonId INTEGER NOT NULL, \
        PRIMARY KEY(Id AUTOINCREMENT), \
        FOREIGN KEY(PersonId) REFERENCES Persons(Id) \
        FOREIGN KEY(TaskId) REFERENCES Tasks(Id) \
    )",
    
    persons : "CREATE TABLE Persons ( \
        Id INTEGER NOT NULL UNIQUE, \
        Name TEXT, \
        Surname TEXT, \
        Login TEXT, \
        RoleId INTEGER NOT NULL DEFAULT 2, \
        Password TEXT NOT NULL, \
        Delete INTEGER NOT NULL DEFAULT 0, \
        DeleteDate TEXT, \
        PRIMARY KEY(Id AUTOINCREMENT) \
        FOREIGN KEY(RoleId) REFERENCES Roles(Id) \
    )",
    
    tasks : "CREATE TABLE Tasks ( \
        Id INTEGER NOT NULL UNIQUE, \
        Description TEXT NOT NULL, \
        Category TEXT NOT NULL, \
        Priority TEXT DEFAULT 'C', \
        CreationDate TEXT, \
        FinishDate TEXT, \
        AuthorId INTEGER NOT NULL, \
        MachineId INTEGER NOT NULL, \
        ResponsibleId INTEGER NOT NULL, \
        Delete INTEGER NOT NULL DEFAULT 0, \
        DeleteDate TEXT, \
        PRIMARY KEY(Id AUTOINCREMENT), \
        FOREIGN KEY(ResponsibleId) REFERENCES Persons(Id), \
        FOREIGN KEY(AuthorId) REFERENCES Persons(Id), \
        FOREIGN KEY(MachineId) REFERENCES Machines(Id) \
    )",
    
    taksConfirms : "CREATE TABLE TasksConfirms ( \
        Id INTEGER NOT NULL UNIQUE, \
        TaskId INTEGER NOT NULL, \
        Status TEXT NOT NULL, \
        PersonId INTEGER NOT NULL, \
        Date TEXT NOT NULL, \
        FOREIGN KEY(TaskId) REFERENCES Tasks(Id), \
        FOREIGN KEY(PersonId) REFERENCES Persons(Id), \
        PRIMARY KEY(Id AUTOINCREMENT) \
    )",

    roles : "CREATE TABLE Roles ( \
        Id INTEGER NOT NULL, \
        Name TEXT NOT NULL, \
        PRIMARY KEY(Id AUTOINCREMENT) \
    )"
}

