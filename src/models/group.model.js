import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    namegroup: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    integrants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    }],
  lider: {
        type : mongoose.Types.ObjectId,
        ref: "User",
        },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Group", groupSchema);