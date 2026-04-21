const express = require('express');
const router = express.Router();

const {createTask,getTasks,singleTask,updateTask,deleteTask} = require("../controllers/taskControllers");
const authMiddleware = require("../middlewares/authMiddleware");


router.post("/", authMiddleware,createTask); //createTask wala route
router.get("/", authMiddleware,getTasks); //getTasks wala route
router.get("/:id", authMiddleware, singleTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);


module.exports = router;