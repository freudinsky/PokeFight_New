import { useState, useEffect, useRef } from "react";
import PokeLogo from "./PokeLogo";
import GameActions from "./GameActions";
import "./GameScreen.css";
import { useNavigate } from "react-router-dom";

function GameScreen({ pokemonA1, pokemonB1 }) {
	const [round, setRound] = useState(0);
	const [cpuQueue, setCpuQueue] = useState([]);
	const [inFight, setInFight] = useState(false);
	const [pokeAhp, setPokeAhp] = useState(0);
	const [pokeBhp, setPokeBhp] = useState(0);
	let pokeIni = useRef("");
	const nav = useNavigate();

	// Player
	const [pokemonA, setPokemonA] = useState({
		id: 31,
		name: {
			english: "Nidoqueen",
			japanese: "ニドクイン",
			chinese: "尼多后",
			french: "Nidoqueen",
		},
		type: ["Poison", "Ground"],
		base: {
			HP: 90,
			Attack: 92,
			Defense: 87,
			"Sp. Attack": 75,
			"Sp. Defense": 85,
			Speed: 76,
		},
	});
	// CPU
	const [pokemonB, setPokemonB] = useState({
		id: 749,
		name: {
			english: "Mudbray",
			japanese: "ドロバンコ",
			chinese: "泥驴仔",
			french: "Tiboudet",
		},
		type: ["Ground"],
		base: {
			HP: 70,
			Attack: 100,
			Defense: 70,
			"Sp. Attack": 45,
			"Sp. Defense": 55,
			Speed: 45,
		},
	});

	//setup images
	let imgBaseUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/`;
	const pokeAimg = imgBaseUrl + `${pokemonA.id}.png`;
	const pokeBimg = imgBaseUrl + `${pokemonB.id}.png`;

	function setupGame() {
		if (!inFight) {
			if (
				pokemonA.base.Speed > pokemonB.base.Speed &&
				pokemonA.base.Speed !== pokemonB.base.Speed
			) {
				pokeIni.current = "A";
			} else pokeIni.current = "B";
			setInFight((curr) => (curr = !curr));
			calculateRound();
		} else calculateRound();
	}

	function calculateRound() {
		if (pokeIni.current === "B") {
			if (cpuQueue.length === 0) {
				setTimeout(() => {
					handleAction("attack", pokemonB.base.Attack, true);
				}, 2000);

				console.log("CPU uses AutoAttack");
			} else {
				setTimeout(() => {
					handleAction("attack", pokemonB.base["Sp. Attack"], true);
				}, 2000);
				console.log("CPU uses Queue");
			}
		}
		setRound((curr) => (curr += 1));
	}

	function stopfight() {
		setInFight((curr) => (curr = !curr));
		setRound((curr) => (curr = 1));
		setPokeAhp((curr) => (curr = pokemonA.base.HP));
		setPokeBhp((curr) => (curr = pokemonB.base.HP));
	}

	useEffect(() => {
		if (!pokemonA1) {
			nav("/select");
		} else {
			setPokeAhp((curr) => (curr = pokemonA.base.HP));
			setPokeBhp((curr) => (curr = pokemonB.base.HP));
		}
	}, []);

	//
	// api/game/save
	//
	// result = "wer hats erfunden?"
	// winner = gewinner ?.name
	// player1 = pokemonA.id
	// player2 = pokemonB.id
	// turns = round

	function setWinner(winnerData) {
		//result, winner, player1, player2, turns, (img_Url, date)
		axios
			.get("http://localhost:8000/game/save", winnerData)
			.then((res) => {
				// setGames(res.data);
				//show winnerscreen (Link to select and leaderboard)
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	}

	function handleAction(action, cpu = false) {
		let att, satt, def, sdef, hp;
		if (cpu) {
			console.log("cpu attacks");
			att = pokemonB.base.Attack;
			satt = pokemonB.base["Sp. Attack"];
			def = pokemonA.base.Defense;
			sdef = pokemonA.base["Sp. Defense"];
			hp = pokeAhp;
		}
		if (!cpu) {
			console.log("player attacks");
			att = pokemonA.base.Attack;
			satt = pokemonA.base["Sp. Attack"];
			def = pokemonB.base.Defense;
			sdef = pokemonB.base["Sp. Defense"];
			hp = pokeBhp;
		}
		let relDamage = att - def;
		if (hp - relDamage <= 0) {
			if (cpu) {
				setPokeAhp((curr) => (curr = 0));
				console.log("The winner is B");
				stopfight();
				return setInFight(false);
			}
			if (!cpu) {
				setPokeBhp((curr) => (curr = 0));
				console.log("The winner is A");
				stopfight();
				return setInFight(false);
			}
		}
		switch (action) {
			case "attack":
				if (cpu) setPokeAhp((curr) => (curr -= relDamage));
				if (!cpu) {
					setPokeBhp((curr) => (curr -= relDamage));
					setCpuQueue([...cpuQueue, action]);
				}
				pokeIni.current === "A"
					? (pokeIni.current = "B")
					: (pokeIni.current = "A");
				calculateRound();
				break;
			case "sattack":
				if (cpu) setPokeAhp((curr) => (curr -= relDamage));
				if (!cpu) {
					setPokeBhp((curr) => (curr -= relDamage));
					setCpuQueue([...cpuQueue, action]);
				}
				pokeIni.current === "A"
					? (pokeIni.current = "B")
					: (pokeIni.current = "A");
				calculateRound();
				break;
			default:
				break;
		}
	}

	return (
		<>
			<div className="GameContainerWrapper">
				<PokeLogo />
				<div className="GameContainer">
					<div className="poke" id="pokeA">
						<div className={inFight ? "stats" : "stats hide"}>
							<label htmlFor="hp">{pokeAhp}</label>
							<progress id="hp" value={pokeAhp} max={pokemonA.base.HP}>
								value
							</progress>
						</div>
						<img
							src={pokeAimg}
							className={pokeIni.current === "A" ? "pokeA" : "pokeA disabled"}
						/>
						{inFight && (
							<GameActions
								inFight={inFight}
								pokemon={pokemonA}
								handleAction={handleAction}
								pokeIni={pokeIni}
							/>
						)}
					</div>
					<div className="poke" id="pokeB">
						<div className={inFight && inFight ? "stats" : "stats hide"}>
							<label htmlFor="hp">{pokeBhp}</label>
							<progress id="hp" value={pokeBhp} max={pokemonB.base.HP}>
								value
							</progress>
						</div>
						<img
							src={pokeBimg}
							className={pokeIni.current === "B" ? "pokeB " : "pokeB disabled"}
						/>
						{inFight && (
							<>
								<div className="actions">
									<div className="singlestat">
										<h3>{pokemonB.name.english}</h3>
									</div>
									<div className="singlestat">
										<div>Attack</div>
										<div>{pokemonB.base.Attack}</div>
									</div>
									<div className="singlestat">
										<div>Special Attack </div>
										<div>{pokemonB.base["Sp. Attack"]}</div>
									</div>
									<div className="singlestat">
										<div>Defend {pokemonB.base.Defense}</div>
									</div>
									<div className="singlestat">
										<div>Special Defense {pokemonB.base["Sp. Defense"]}</div>
									</div>
								</div>
							</>
						)}
					</div>
					<button id="fight" onClick={setupGame}>
						{inFight ? `Round ${round}` : "FIGHT"}
					</button>
					{inFight ? (
						<button id="stopfight" onClick={stopfight}>
							Give Up!
						</button>
					) : (
						""
					)}
				</div>
			</div>
		</>
	);
}

export default GameScreen;
