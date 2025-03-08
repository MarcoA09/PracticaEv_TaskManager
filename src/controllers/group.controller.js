import Group from '../models/group.model.js';


export const getGroups = async (req, res) => {
    try {
        const groups = await Group.find({lider : req.user.id}).populate("lider");
        res.json(groups);
    } catch (error){
        return res.status(500).json({message:error.message});
    }
};

export const createGroup = async (req, res) => {
    try {
        const { namegroup, description, integrants } = req.body;
        const newGroup = new Group({
            namegroup,
            description,
            integrants,
            lider: req.user.id,
        });
        await newGroup.save();
        res.json(newGroup);
    } catch (error) {
        return res.status(500).json({message: error.message});
    
    }
}; 

export const getIntegrantsGroup = async (req, res) => {
    try {
      const { idGroup } = req.params;
      
      if (!idGroup) {
        return res.status(400).json({ message: "El ID del grupo es requerido" });
      }
      
      const group = await Group.findById(idGroup).populate('integrants', '_id username email');

      
      if (!group) {
        return res.status(404).json({ message: "Grupo no encontrado" });
      }
      
      res.json(group.integrants);
      
      console.log("Grupo encontrado:", group.integrants);
    } catch (error) {
      console.error("Error al obtener grupo:", error);
      return res.status(500).json({ message: error.message });
    }
  };
