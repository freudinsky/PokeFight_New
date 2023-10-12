import { useState, useEffect, useRef } from "react";
import PokeLogo from "./PokeLogo.jsx";
import GameActions from "./GameAction.jsx";
import "./GameScreen.css";
import { redirect, useNavigate } from "react-router-dom";

function GameScreen({ pokemonA, pokemonB }) {
	const [round, setRound] = useState(0);
	const [cpuQueue, setCpuQueue] = useState([]);
	const [inFight, setInFight] = useState(false);
	const [pokeAhp, setPokeAhp] = useState(0);
	const [pokeBhp, setPokeBhp] = useState(0);
	let pokeIni = useRef("");
  const nav = useNavigate()

	useEffect(() => {
		if (!pokemonA || !pokemonB) {
			nav("/select");
		} else {
			setPokeAhp((curr) => (curr = pokemonA.base.hp));
			setPokeBhp((curr) => (curr = pokemonB.base.hp));
		}
	}, []);

	function setupGame() {
		if (!inFight) {
			if (
				pokemonA.base.speed > pokemonB.base.speed &&
				pokemonA.base.speed !== pokemonB.base.speed
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
          handleAction("attack", pokemonB.base.attack, true);
        }, 2000);
      } else {
        setTimeout(() => {
          handleAction("attack", pokemonB.base.sp_attack, true);
        }, 2000);
      }
    }
    setRound((curr) => (curr += 1));
  }

	function stopfight() {
		setInFight((curr) => (curr = !curr));
		setRound((curr) => (curr = 1));
		setPokeAhp((curr) => (curr = pokemonA.base.hp));
		setPokeBhp((curr) => (curr = pokemonB.base.hp));
	}

	//
	// api/game/save
	//
	// result = "wer hats erfunden?"
	// winner = gewinner ?.name
	// player1 = pokemonA.id
	// player2 = pokemonB.id
	// turns = round

  function setWinner(winnerData) {
    axios
      .post(`${import.meta.env.VITE_API_URL}/game/save`, winnerData)
      .then((res) => {
        // setGames(res.data);
        //show winnerscreen (Link to select and leaderboard)
      })
      .catch((err) => console.log(err));
  }

  function handleAction(action, cpu = false) {
    let att, satt, def, sdef, hp;
    if (cpu) {
      att = pokemonB.base.attack;
      satt = pokemonB.base.sp_attack;
      def = pokemonA.base.defense;
      sdef = pokemonA.base.sp_defense;
      hp = pokeBhp;
    }
    if (!cpu) {
      att = pokemonA.base.attack;
      satt = pokemonA.base.sp_attack;
      def = pokemonB.base.defense;
      sdef = pokemonB.base.sp_defense;
      hp = pokeAhp;
    }
    //TODO: refactor damage calculation
    // def > att results in minus damage, modify based on speed?
    let relDamage = att
    let factor = att / def;
    if(factor < 1){
      relDamage = Math.floor(att * factor)
    }else{
      relDamage = att - def
    }
    // relDamage = Math.abs(relDamage); // bugfix for now
    if (hp - relDamage <= 0) {
      if (cpu) {
        setPokeAhp((curr) => (curr = 0));
        //TODO: show endscreen and post results
        //result, winner, player1, player2, turns, img_Url, date
        //setWinner();
        stopfight();
        return setInFight(false);
      }
      if (!cpu) {
        setPokeBhp((curr) => (curr = 0));
        //TODO: show endscreen and post results
        //result, winner, player1, player2, turns, img_Url, date
        //setWinner();
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
     {pokemonA && pokemonB ? <div className="GameContainerWrapper">
        <PokeLogo />
        <div className="GameContainer">
          <div className="poke" id="pokeA">
            <div className={inFight ? "stats" : "stats hide"}>
              <label htmlFor="hp">{pokeAhp}</label>
              <progress id="hp" value={pokeAhp} max={pokemonA.base.hp}>
                value
              </progress>
            </div>
            <img
              src={pokemonA.picture}
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
              <progress id="hp" value={pokeBhp} max={pokemonB.base.hp}>
                value
              </progress>
            </div>
            <img
              src={pokemonB.picture}
              className={pokeIni.current === "B" ? "pokeB " : "pokeB disabled"}
            />
            {inFight && (
              <>
                <div className="actions">
                  <div className="singlestat name">
                    <h3>{pokemonB.name}</h3>
                  </div>
                  <div className="singlestat">
                    <div>Attack</div>
                    <div>{pokemonB.base.attack}</div>
                  </div>
                  <div className="singlestat">
                    <div>Special Attack </div>
                    <div>{pokemonB.base.sp_attack}</div>
                  </div>
                  <div className="singlestat">
                    <div>Defend</div>
                    <div> {pokemonB.base.defense}</div>
                  </div>
                  <div className="singlestat">
                    <div>Special Defense</div>
                    <div>{pokemonB.base.sp_defense}</div>
                  </div>
                </div>
              </>
            )}
          </div>
          {!inFight && <div>Fight</div>}
          {inFight ? (
            <>
              <button id="fight" disabled>
                Round {round}
              </button>
              <button id="stopfight" onClick={stopfight}>
                Give Up!
              </button>
            </>
          ) : (
            <button id="fight" onClick={setupGame}>
              FIGHT
            </button>
          )}
        </div>
      </div> : ""}
    </>
  );
}

export default GameScreen;
