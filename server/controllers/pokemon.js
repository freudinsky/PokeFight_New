import Pokemon from "../models/Pokemon.js";

export const getPokemon = async (req, res) => {
	try {
		const pokeData = await Pokemon.find();
		res.json(pokeData);
	} catch (err) {
		res.status(500).send("Error fetching: ", err);
	}
};

export const getPokemonById = async (req, res) => {
	const searchId = Number(req.params.id);
	try {
		const pokeById = await Pokemon.findOne({ num: searchId });
		res.json(pokeById);
	} catch (err) {
		res.status(500).json({ message: "Error fetching: ", err });
	}
};

export const getPokemonInfoById = async (req, res) => {
	const searchId = Number(req.params.id);
	const searchInfo = req.params.info;
	const checkArr = ["name", "type", "base"];

	if (!checkArr.includes(searchInfo)) {
		return res.status(400).json({ message: "Invalid info parameter" });
	}

	try {
		const treffer = await Pokemon.findOne({ num: searchId });
		res.json(treffer[searchInfo]);
	} catch (err) {
		res.status(500).json({ message: "Error fetching: ", err });
	}
};
