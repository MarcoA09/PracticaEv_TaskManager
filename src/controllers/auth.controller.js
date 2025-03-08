import User from "../models/user.model.js";
import Colab from "../models/colaborador.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, rol } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({
        message: ["El email ya está registrado"],
      });
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      rol: rol,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({
     id: userSaved._id,
    });

    res.json({
      token, 
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      rol: userSaved.rol,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["El email no existe"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["La password es incorrecta, intente de nuevo"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
      rol: userFound.rol,
    });

    res.json({
      token, 
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      rol: userFound.rol,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const colabFound = await Colab.findOne({ email });

    if (!colabFound)
      return res.status(400).json({
        message: ["El email no esta preregistrado"],
      });

    res.json({
      id: colabFound._id,
      name: colabFound.name,
      email: colabFound.email,
      rol: colabFound.rol,
      succes: true
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  
  if (!token) return res.send(false); 

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401); 

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401); 

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      rol: userFound.rol,
    });
  });
};


export const getUsers = async (req, res) => {
  try {
    const { username } = req.query; 
    let filter = username ? { username: new RegExp(username, "i") } : {}; 
    const users = await User.find(filter);
    
    return res.json(users); 
  } catch (error) {
    console.error("Error en getUsers:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};