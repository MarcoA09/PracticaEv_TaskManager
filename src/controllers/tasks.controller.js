import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRol = req.user.rol;
   /*  const tasks = await Task.find({ user : req.user.id }).populate("user"); */

let tasks;

if (userRol === "SuperAdmin") {
  tasks = await Task.find()
  .populate("user", "username email rol")        
  .populate("user_assigned", "username email rol") 
  .populate("group", "name");                    
} else {
  tasks = await Task.find({
    $or: [
      { user: userId },          
      { user_assigned: userId }   
    ]
  })
  .populate("user", "username email rol")        
  .populate("user_assigned", "username email rol") 
  .populate("group", "name"); 
}                   
  res.json(tasks);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const createTask = async (req, res) => {
  try {
    const { nametask, description, fecha, recordar, estado, category, group, user_assigned } = req.body;
    const newTask = new Task({
      nametask,
      description,
      fecha,
      recordar,
      estado,
      category,
      group,
      user_assigned,
      user: req.user.id,
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getTasksGroups = async (req, res) => {
  try {
    const {idGroup} = req.params;
    if (!idGroup) {
      return res.status(400).json({ message: "El ID del grupo es requerido" });
    }
    const tasksgroups = await Task.find({ group : idGroup }).populate("user");
    res.json(tasksgroups);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    
    console.log("ID de usuario actual:", req.user.id);
    console.log("ID de usuario asignado a la tarea:", task.user_assigned.toString());
    
    if (task.user_assigned.toString() !== req.user.id) {
      return res.status(403).json({ 
        message: "No tienes permiso para actualizar esta tarea. Solo el usuario asignado puede modificarla.",
        currentUserId: req.user.id,
        assignedUserId: task.user_assigned.toString()
      });
    }
    
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error en updateTask:", error);
    return res.status(500).json({ message: error.message });
  }
};
