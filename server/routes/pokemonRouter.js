import express from "express";
import { getPokemon, getPokemonById } from "../controllers/pokemon.js";

const pokemonRouter = express.Router();

// GET route on /pokemon which gives the complete list of pokemon from the JSON
pokemonRouter.route("/").get(getPokemon);

// GET route on /pokemon/:id which gives only one pokemon from the JSON thanks to its id
pokemonRouter.route("/:id").get(getPokemonById);

// GET route on /pokemon/:id/:info (||) which
pokemonRouter.route("/:id/:info").get(getPokemonById);

export default pokemonRouter;
