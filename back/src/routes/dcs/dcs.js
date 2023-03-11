// Importing express module
const express = require("express")
const router = express.Router()
  
// Handling request using router
router.get("/TEST",(req,res,next) => {
    res.send("DCS ROUTE TEST SUCCESSFUL");
})

//machines

  
// Importing the router
module.exports = router