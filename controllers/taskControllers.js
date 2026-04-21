const Task = require("../models/taskModel");

//pehle route mein toh task create ho rha hai ki kasie hoga
const createTask = async(req,res)=>{
    try{
    const { title, description, dueDate } = req.body;
     if (!title || !description) {
        return res.status(400).json({ message: "Title and description required" });
     }
    const task = await Task.create({
        title,
        description,
        dueDate,
        userId: req.user.id
    });
    res.status(201).json({
        message:"Data entered succefully",
        task //will give users input in return as response
    })
} 
catch(error){ 
    res.status(500).json({
        message: error.message
    });
};

}

//so basically when a person logs in, it gets token which gets stored and verified by middlewares so 
// that user can access any route, so below we r extracting userId from middleware.
const getTasks = async (req, res) => {
    //this route makes sure that no other user could access another user's tasks
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ userId });

    res.status(200).json({
      count: tasks.length,
      tasks 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const singleTask = async(req,res)=>{
    try{
        const taskId = req.params.id;
        const task = await Task.findById(taskId);

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        if(String(task.userId) !== String(req.user.id)){
            return res.status(403).json({message:"Not authorised"});
        }
        res.status(200).json(task)


    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

const updateTask = async(req,res)=>{
    try{
    const task = req.params.id;

    const specificTask = await Task.findById(task);
     if(!specificTask){
        return res.status(404).json({message:"Task not found"});
     }
     if(String(specificTask.userId) !== String(req.user.id)){
        return res.status(403).json({message:"Not authorised"});
     }
     const newTask  = await Task.findByIdAndUpdate(
        task,
        req.body,
        {new: true}
     );
     res.status(200).json(newTask)
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (String(task.userId) !== String(req.user.id)) {
      return res.status(403).json({ message: "Not authorised" });
    }

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createTask,getTasks, singleTask, updateTask, deleteTask};