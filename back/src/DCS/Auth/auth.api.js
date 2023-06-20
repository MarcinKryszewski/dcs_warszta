const Person = require("../Persons/persons.model");
const Role = require("../Roles/roles.model");

class AuthActions {
  async Login(req, res) {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required." });

    const foundUser = await Person.findOne({
      where: { Login: username, Password: password },
    });

    if (!foundUser) return res.sendStatus(401);

    if (foundUser) {
      const roleCode = await Role.findOne({ where: { Id: foundUser.RoleId } });
      const loginData = {
        userName: foundUser.Login,
        role: roleCode.RoleCode,
        accessToken: 1,
        Name: foundUser.Name,
        Surname: foundUser.Surname,
      };
      res.status(200).json(loginData);
    } else {
      res.sendStatus(401);
    }
  }
}

module.exports = new AuthActions();
