module.exports = {

    machines : "CREATE TABLE Machines ( \
        id INTEGER NOT NULL UNIQUE, \
        Area TEXT NOT NULL, \
        MachineName TEXT NOT NULL, \
        Delete INTEGER NOT NULL DEFAULT 0, \
        DeleteDate TEXT, \
        PRIMARY KEY(Id AUTOINCREMENT) \
    )",
    
    partsStatuses : "CREATE TABLE PartsStatuses ( \
        id INTEGER NOT NULL UNIQUE, \
        Taskid INTEGER NOT NULL, \
        Status TEXT NOT NULL, \
        Date TEXT NOT NULL, \
        Personid INTEGER NOT NULL, \
        PRIMARY KEY(Id AUTOINCREMENT), \
        FOREIGN KEY(PersonId) REFERENCES Persons(Id) \
        FOREIGN KEY(TaskId) REFERENCES Tasks(Id) \
    )",
    
    persons : "CREATE TABLE Persons ( \
        id INTEGER NOT NULL UNIQUE, \
        Name TEXT, \
        Surname TEXT, \
        Login TEXT, \
        Roleid INTEGER NOT NULL DEFAULT 2, \
        Password TEXT NOT NULL, \
        Delete INTEGER NOT NULL DEFAULT 0, \
        DeleteDate TEXT, \
        PRIMARY KEY(Id AUTOINCREMENT) \
        FOREIGN KEY(RoleId) REFERENCES Roles(Id) \
    )",
    
    tasks : "CREATE TABLE Tasks ( \
        id INTEGER UNIQUE, \
        Description TEXT NOT NULL, \
        Category TEXT NOT NULL, \
        Priority TEXT DEFAULT 'C', \
        CreationDate TEXT, \
        FinishDate TEXT, \
        Authorid INTEGER NOT NULL, \
        Machineid INTEGER NOT NULL, \
        Responsibleid INTEGER NOT NULL, \
        Delete INTEGER NOT NULL DEFAULT 0, \
        DeleteDate TEXT, \
        PRIMARY KEY(Id AUTOINCREMENT), \
        FOREIGN KEY(ResponsibleId) REFERENCES Persons(Id), \
        FOREIGN KEY(AuthorId) REFERENCES Persons(Id), \
        FOREIGN KEY(MachineId) REFERENCES Machines(Id) \
    )",
    
    taksConfirms : "CREATE TABLE TasksConfirms ( \
        id INTEGER NOT NULL UNIQUE, \
        Taskid INTEGER NOT NULL, \
        Status TEXT NOT NULL, \
        Personid INTEGER NOT NULL, \
        Date TEXT NOT NULL, \
        FOREIGN KEY(TaskId) REFERENCES Tasks(Id), \
        FOREIGN KEY(PersonId) REFERENCES Persons(Id), \
        PRIMARY KEY(Id AUTOINCREMENT) \
    )",

    roles : "CREATE TABLE Roles ( \
        id INTEGER NOT NULL, \
        Name TEXT NOT NULL, \
        PRIMARY KEY(Id AUTOINCREMENT) \
    )"
}

