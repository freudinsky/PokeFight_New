import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { ColorRing } from "react-loader-spinner";
import PokeCard from "./PokeCard.jsx";
import PokeLogo from "./PokeLogo.jsx";
import "./Select.css";

function Select({ selection, setUserSelection, setCPU }) {
	const [pokemon, setPokemon] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

const cpuNum = Math.floor(Math.random() * 777 + 1)
async function cpuChoice(){
	try{
		const res = await axios.get(`${import.meta.env.VITE_API_URL}/pokemon/${cpuNum}`);
		const fetchedCPU = res.data
		setCPU(fetchedCPU)
	}catch(error){
		console.log("Brudi..Fehler! ", error)
	}
}

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
						const res = await axios.get(`${import.meta.env.VITE_API_URL}/pokemon/${num}`);
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
		cpuChoice()
	}, []);
	return (
		<>
			<div className="SelectContainerWrapper">
				<PokeLogo />
				<div className="selection-wrap">
					<h2 className="sel-header">Choose your Pokemon!</h2>

					{isLoading ? 
						<ColorRing
							visible={true}
							height="150"
							width="150"
							ariaLabel="blocks-loading"
							wrapperStyle={{}}
							wrapperClass="blocks-wrapper"
							colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
						/>
					 : 
						pokemon && pokemon.length > 1 ? (
						<Carousel
							activeIndex={index}
							onSelect={handleSelect}
							interval={null}
						>
							{" "}
							{pokemon.map((e) => (
							<Carousel.Item key={e?.num}>
								<PokeCard
									key={e?.num}
									pokemon={e}
									sel={selection}
									setSel={setUserSelection}
								/>
							</Carousel.Item>
							) )}
						</Carousel>
					) : (
						""
					)}
				</div>
			</div>
		</>
	);
}

export default Select;
