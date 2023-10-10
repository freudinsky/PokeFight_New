import express from "express";
import * as gamesController from "../controllers/gamesController.js";

const gameRouter = express.Router();

gameRouter.route("/save").post(gamesController.addNewGame);

gameRouter.route("/leaderboard").get(gamesController.getAllGames);

export default gameRouter;
