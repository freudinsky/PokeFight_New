import axios from "axios";
import fs from "fs";
import path from "path";
import Pokemon from "../models/Pokemon.js";
import { fileURLToPath } from "url";
import mongoose from "mongoose";


await mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.log(error.stack);
	});

	const mongo = mongoose.connection

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fetchPokemonData = async () => {
	try {
		const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1500");
		return response.data.results;
	} catch (error) {
		console.error("Error fetching Pokémon data:", error);
		throw error;
	}
};

const matchPokemonData = (localData, apiData) => {
	const matchedPokemon = [];
	for (const pokemon of localData) {
		// console.log(pokemon.name.english.toLowerCase());
		const matchingApiPokemon = apiData.find(
			(apiPokemon) => apiPokemon.name === pokemon.name.english.toLowerCase()
		);

		if (matchingApiPokemon) {
			const { sprites } = matchingApiPokemon;
			const picture = sprites?.home.front_default || null;

			const newPokeObj = {
				...pokemon,
				num: pokemon.id,
				name: pokemon.name.english,
				type: pokemon.type,
				base: {
					hp: pokemon.base.HP,
					attack: pokemon.base.Attack,
					defense: pokemon.base.Defense,
					sp_attack: pokemon.base["Sp. Attack"],
					sp_defense: pokemon.base["Sp. Defense"],
					speed: pokemon.base.Speed
				}
			};
			matchedPokemon.push(newPokeObj);
		} else {
			console.log(`${pokemon.name.english} 404 in PokeAPI`);
		}
	}

	return matchedPokemon;
};

const fetchData = async () => {
	try {
		const localPokedexPath = path.join(__dirname, "pokedex.json");
		const localPokedex = JSON.parse(fs.readFileSync(localPokedexPath, "utf8"));

		const apiPokemonData = await fetchPokemonData();

		const pokeArray = matchPokemonData(localPokedex, apiPokemonData);

		await Pokemon.insertMany(pokeArray);

		console.log("Migration successful");
	} catch (error) {
		console.error("Error: ", error);
	} finally {
		await mongoose.connection.close();
		console.log("MongoDB connection closed.");
	}
};

fetchData();
