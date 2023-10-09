import { express, Router } from "express";
import * as gamesController from "../controllers/gamesController.js";

const gameRouter = express.Router();

gameRouter.path("/save").post(gamesController.addGame);

export default gameRouter;
