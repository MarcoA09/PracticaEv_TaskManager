import mongoose from "mongoose";

const colabSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    email: { 
      type: String,
      required: true,
    },
    rol: {
      type: String,
      required: true,
    },
    codigo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Colab", colabSchema);