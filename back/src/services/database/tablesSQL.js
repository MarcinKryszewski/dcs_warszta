module.exports = {

    machines : "CREATE TABLE Machines ( \
        Id INTEGER NOT NULL UNIQUE, \
        Area TEXT NOT NULL, \
        MachineName TEXT NOT NULL, \
        Delete	INTEGER NOT NULL DEFAULT 0, \
	    DeleteDate	TEXT, \
        PRIMARY KEY(Id AUTOINCREMENT) \
    )",
    
    partsStatuses : "CREATE TABLE PartsStatuses ( \
        Id	INTEGER NOT NULL UNIQUE, \
        Task	TEXT NOT NULL, \
        Status	TEXT NOT NULL, \
        Date	TEXT NOT NULL, \
        Person	INTEGER NOT NULL, \
        PRIMARY KEY(Id AUTOINCREMENT), \
        FOREIGN KEY(Person) REFERENCES Persons(Id) \
    )",
    
    persons : "CREATE TABLE Persons ( \
        Id	INTEGER NOT NULL UNIQUE, \
        Name	TEXT NOT NULL, \
        Surname	TEXT NOT NULL, \
        Login	TEXT, \
        Role	INTEGER NOT NULL DEFAULT 2, \
        Delete	INTEGER NOT NULL DEFAULT 0, \
        DeleteDate	TEXT, \
        PRIMARY KEY(Id AUTOINCREMENT) \
    )",
    
    tasks : "CREATE TABLE Tasks ( \
        Id	INTEGER NOT NULL UNIQUE, \
        Description	TEXT NOT NULL, \
        Category	TEXT NOT NULL, \
        Priority	TEXT DEFAULT 'C', \
        CreationDate	TEXT, \
        FinishDate	TEXT, \
        Author	INTEGER NOT NULL, \
        Machine	INTEGER NOT NULL, \
        Responsible	INTEGER NOT NULL, \
        Delete	INTEGER NOT NULL DEFAULT 0, \
	    DeleteDate	TEXT, \
        PRIMARY KEY(Id AUTOINCREMENT), \
        FOREIGN KEY(Responsible) REFERENCES Persons(Id), \
        FOREIGN KEY(Author) REFERENCES Persons(Id), \
        FOREIGN KEY(Machine) REFERENCES Machines(Id) \
    )",
    
    taksConfirms : "CREATE TABLE TasksConfirms ( \
        Id	INTEGER NOT NULL UNIQUE, \
        Task	INTEGER NOT NULL, \
        Status	TEXT NOT NULL, \
        Person	INTEGER NOT NULL, \
        Date	TEXT NOT NULL, \
        FOREIGN KEY(Task) REFERENCES Tasks(Id), \
        FOREIGN KEY(Person) REFERENCES Persons(Id), \
        PRIMARY KEY(Id AUTOINCREMENT) \
    )",

    roles : "CREATE TABLE Roles ( \
        Id	INTEGER NOT NULL, \
        Name	TEXT NOT NULL, \
        PRIMARY KEY(Id AUTOINCREMENT) \
    )"
}

