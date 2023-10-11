
import React from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function PokeCard({ pokemon, sel, setSel }) {
    const nav = useNavigate() 

    function handleBtn(e){
        e.preventDefault()
        setSel(pokemon.num)
        nav("/game")
    }

	return (
		<Card border="dark" style={{ width: "330px", backgroundColor: "#68d4c9" }}>
			<Card.Img variant="top" src={pokemon.picture} />
			<Card.Body>
				<Card.Title>{pokemon.name}</Card.Title>

				<p>{pokemon.type.length > 1 ? "Types:" : "Type:"}</p>
				<ul className="card-ul">
					{pokemon.type.map((e) => (
						<li key={crypto.randomUUID()}> {<img className="typeIcon" src={`../../public/typeIcons/${e}.svg`}/>} {e}</li>
					))}
				</ul>
				<p>Stats:</p>
				<ul className="card-ul stats">
					<li>
						<span className="ul-span">HP: </span>
						{pokemon.base.hp}
					</li>
					<li>
						<span className="ul-span">ATK: </span>
						{pokemon.base.attack}
					</li>
					<li>
						<span className="ul-span">DEF: </span>
						{pokemon.base.defense}
					</li>
					<li>
						<span className="ul-span">Sp. ATK: </span>
						{pokemon.base.sp_attack}
					</li>
					<li>
						<span className="ul-span">Sp. DEF: </span>
						{pokemon.base.sp_defense}
					</li>
					<li>
						<span className="ul-span">Speed: </span>
						{pokemon.base.speed}
					</li>
				</ul>
			</Card.Body>
			<Button className="btn-sel" variant="dark" onClick={handleBtn}>
				Choose {pokemon.name}
			</Button>
		</Card>
	);
}

export default PokeCard;
