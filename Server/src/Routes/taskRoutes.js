const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTask,
  getAllTasks,
} = require("../controller/taskController");

//Define routes
router.post("/createTask", createTask);
router.put("/updateTask/:id", updateTask);
router.get("/getTask", getAllTasks);

module.exports = router;
