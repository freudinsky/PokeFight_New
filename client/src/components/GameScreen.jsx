import { useState, useEffect, useRef } from "react";
import PokeLogo from "./PokeLogo";
import GameActions from "./GameActions";
import "./GameScreen.css";
import { useNavigate } from "react-router-dom";

function GameScreen({ pokemonA, pokemonB }) {
  const [round, setRound] = useState(0);
  const [cpuQueue, setCpuQueue] = useState([]);
  const [inFight, setInFight] = useState(false);
  const [pokeAhp, setPokeAhp] = useState(0);
  const [pokeBhp, setPokeBhp] = useState(0);
  let pokeIni = useRef("");
  const nav = useNavigate();

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
        console.log("CPU uses AutoAttack");
      } else {
        setTimeout(() => {
          handleAction("attack", pokemonB.base.sp_attack, true);
        }, 2000);
        console.log("CPU uses special attack");
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

  useEffect(() => {
    if (!pokemonA) {
      nav("/select");
    } else {
      setPokeAhp((curr) => (curr = pokemonA.base.hp));
      setPokeBhp((curr) => (curr = pokemonB.base.hp));
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
    //TODO: write winner to db
    //result, winner, player1, player2, turns, img_Url, date
    axios
      .post("http://localhost:8000/game/save", winnerData)
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
      att = pokemonB.base.attack;
      satt = pokemonB.base.sp_attack;
      def = pokemonA.base.defense;
      sdef = pokemonA.base.sp_defense;
      hp = pokeBhp;
    }
    if (!cpu) {
      console.log("player attacks");
      att = pokemonA.base.attack;
      satt = pokemonA.base.sp_attack;
      def = pokemonB.base.defense;
      sdef = pokemonB.base.sp_defense;
      hp = pokeAhp;
    }
    let relDamage = att - def; //TODO: refactor damage calculation
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
                  <div className="singlestat">
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
                    <div>Defend {pokemonB.base.defense}</div>
                  </div>
                  <div className="singlestat">
                    <div>Special Defense {pokemonB.base.sp_defense}</div>
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
