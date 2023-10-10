import axios from "axios";

export async function jsonCall() {
	try {
		const res = await axios.get("server/data/pokedex.json");
		if (res.status === 200) {
			const poke = await res.data;
			return poke;
		} else {
			console.log("Error fetching");
		}
	} catch (e) {
		console.log("error: " + e);
	}
}

export async function pokeAPI(pokemon) {
	try {
		const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
		if (res.status === 200) {
			const poke = await res.data;
			return poke;
		} else {
			console.log("Error fetching");
		}
	} catch (e) {
		console.log("error: " + e);
	}
}
