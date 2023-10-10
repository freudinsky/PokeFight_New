import React, { useEffect, useState } from "react";
import { jsonCall, pokeAPI } from "../../services/APIcall";

function Select() {
	const [pokemon, setPokemon] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	function randomNr() {
		const randoms = [];
		for (let i = 0; i < 10; i++) {
			randoms.push(Math.floor(Math.random() * 897 + 1));
		}
		return randoms;
	}

	console.log(randomNr());

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await jsonCall();
				const randomPokemonIds = randomNr();
				const pokemonData = randomPokemonIds.map(async (id) => {
					const pokemonDetails = response.find((res) => res.id === id);
					if (pokemonDetails) {
						const pokeApiResponse = await pokeAPI(
							pokemonDetails.name.english.toLowerCase()
						);
						pokemonDetails.picture =
							pokeApiResponse.sprites.other.home.front_default;
						return pokemonDetails;
					}
					return null;
				});

				const pokeData = await Promise.all(pokemonData);
				setPokemon(pokeData.filter((p) => p !== null));
			} catch (error) {
				console.log("Error:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	console.log(pokemon);

	return <></>;
}

export default Select;
