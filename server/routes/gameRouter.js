import express from "express";
import * as gamesController from "../controllers/gamesController.js";

const gameRouter = express.Router();

gameRouter.route("/save").post(gamesController.addNewGame);

export default gameRouter;
