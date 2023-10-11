import React, { useEffect, useState } from "react";
import "./Select.module.css";

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
		
	}, []);

	console.log(pokemon);

	return (
		<>
			<div className="select-body">
				<div className="cardcont"></div>
			</div>
		</>
	);
}

export default Select;
