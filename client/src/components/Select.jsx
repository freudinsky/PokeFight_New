import React, { useEffect, useState } from "react";
import "./Select.css";
import PokeLogo from "./PokeLogo";
import PokeCard from "./PokeCard";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";

function Select({ selection, setUserSelection }) {
	const [pokemon, setPokemon] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	function randomNr() {
		const randoms = [];
		for (let i = 0; i < 10; i++) {
			randoms.push(Math.floor(Math.random() * 777 + 1));
		}
		return randoms;
	}

	useEffect(() => {
		async function fetchData() {
			const randomArr = randomNr();
			const pokeSelection = await Promise.all(
				randomArr.map(async (num) => {
					try {
						const res = await axios.get(`http://localhost:8000/pokemon/${num}`);
						const fetchedPoke = await res.data;
						return fetchedPoke;
					} catch (e) {
						console.log("Error: ", e);
					}
				})
			);
			const filteredPokeSelection = pokeSelection.filter(
				(poke) => poke !== null
			);

			setPokemon(filteredPokeSelection);
			setIsLoading(false);
		}
		fetchData();
	}, []);
	return (
		<>
			<div className="SelectContainerWrapper">
				<PokeLogo />
				<div className="selection-wrap">
					{isLoading ? (
						<ColorRing
							visible={true}
							height="80"
							width="80"
							ariaLabel="blocks-loading"
							wrapperStyle={{}}
							wrapperClass="blocks-wrapper"
							colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
						/>
					) : (
						""
					)}
					{pokemon && pokemon.length > 1
						? pokemon.map((e) => (
								<PokeCard key={e?.num} pokemon={e} sel={selection} setSel={setUserSelection} />
						  ))
						: ""}
				</div>
			</div>
		</>
	);
}

export default Select;
