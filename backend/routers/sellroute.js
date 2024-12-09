const express = require("express");
const router = express.Router();
const dataController = require("../controller/sellcontroller");

 
router.post("/data", dataController.saveData);
router.get("/data/sell", dataController.getData);
 
module.exports = router;
