import Colab from "../models/colaborador.model.js";

export const getColabs = async (req, res) => {
  try {
    const colaboradores = await Colab.find()
    res.json(colaboradores);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createColab = async (req, res) => {
  try {
    const { name, email, rol, codigo } = req.body;
    const newColab = new Colab({
      name,
      email,
      rol,
      codigo,
    });
    await newColab.save();
    res.json(newColab);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

