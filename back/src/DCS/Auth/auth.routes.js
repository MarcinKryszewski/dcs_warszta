const express = require("express");
const router = express.Router();
const AuthActions = require("./auth.api");

router.post("/", AuthActions.Login);

module.exports = router;
