import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  result: {
    type: String,
    required: true,
  },
  winner: {
    type: String,
    required: true,
  },
  player1: {
    type: String,
    required: true,
  },
  player2: {
    type: String,
    required: true,
  },
  turns: {
    type: Number,
    required: true,
  },
  img_Url: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Games", gameSchema);
