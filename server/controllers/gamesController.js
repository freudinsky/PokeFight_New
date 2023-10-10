import Games from "../models/Games.js";

export const addNewGame = async (req, res, next) => {
  const { result, winner, player1, player2, turns, img_Url, date } = req.body;
  try {
    const newGame = await Games.create({
      result,
      winner,
      player1,
      player2,
      turns,
      img_Url,
      date,
    });
    res.status(201).json(newGame);
  } catch (error) {
    next(error);
  }
};
