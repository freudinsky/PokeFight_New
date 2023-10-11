import { useState, useEffect } from "react";
import "./GameScreen.css";

function GameScreen({ pokemonA1, pokemonB1 }) {
  const [round, setRound] = useState(1);
  const [inFight, setInFight] = useState(false);
  const [pokeIni, setPokeIni] = useState("");
  const [pokeAhp, setPokeAhp] = useState(0);
  const [pokeBhp, setPokeBhp] = useState(0);
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
    // GameLoop:
    // "Fight": Start
    //    countdown: 3, 2, 1?
    //    round based?
    //    check: health for win/lose condition
    //    action: attack / defend / spAttack / spDefense
    if (!inFight) {
      if (
        pokemonA.base.Speed > pokemonB.base.Speed &&
        pokemonA.base.Speed !== pokemonB.base.Speed
      ) {
        setPokeIni((curr) => (curr = "A"));
      } else setPokeIni((curr) => (curr = "A"));
      setInFight((curr) => (curr = !curr));
    } else calculateRound();
  }

  function calculateRound() {
    setRound((curr) => (curr += 1));
  }

  function stopfight() {
    setInFight((curr) => (curr = !curr));
    setRound((curr) => (curr = 1));
    setPokeAhp((curr) => (curr = pokemonA.base.HP));
    setPokeBhp((curr) => (curr = pokemonB.base.HP));
  }

  useEffect(() => {
    setPokeAhp((curr) => (curr = pokemonA.base.HP));
    setPokeBhp((curr) => (curr = pokemonB.base.HP));
  }, []);

  function handleAction(action, value) {
    let relDamage = value - pokemonB.base.Defense;
    if (pokeBhp - relDamage <= 0) {
      setPokeBhp((curr) => (curr = 0));
      //setWinner("player");
      stopfight();
      return setInFight(false);
    }
    switch (action) {
      case "attack":
        setPokeBhp((curr) => (curr -= relDamage));
        break;
      case "defense":
      case "sattack":
      case "sdefense":
      default:
        break;
    }
  }

  return (
    <>
      <div className="GameContainer">
        <div className="poke" id="pokeA">
          <div className="stats">
            <label htmlFor="hp">{pokeAhp}</label>
            <progress id="hp" value={pokeAhp} max={pokemonA.base.HP}>
              value
            </progress>
          </div>
          <img src={pokeAimg} />
          <div className="actions">
            <button
              id="attack"
              onClick={() => handleAction("attack", pokemonA.base.Attack)}
              disabled={!inFight}
            >
              <div>Attack</div>
              <div>{pokemonA.base.Attack}</div>
            </button>
            <button
              id="defend"
              onClick={() => handleAction("defense", pokemonA.base.Defense)}
              disabled={!inFight}
            >
              <div>Defend</div>
              <div>{pokemonA.base.Defense}</div>
            </button>
            <button
              id="sattack"
              onClick={() =>
                handleAction("sattack", pokemonA.base["Sp. Attack"])
              }
              disabled={!inFight}
            >
              <div>Special Attack </div>
              <div>{pokemonA.base["Sp. Attack"]}</div>
            </button>
            <button
              id="sdefend"
              onClick={() =>
                handleAction("sdefense", pokemonA.base["Sp. Defense"])
              }
              disabled={!inFight}
            >
              <div>Special Defense</div>
              <div>{pokemonA.base["Sp. Defense"]}</div>
            </button>
          </div>
        </div>
        <div className="poke" id="pokeB">
          <div className="stats">
            <label htmlFor="hp">{pokeBhp}</label>
            <progress id="hp" value={pokeBhp} max={pokemonB.base.HP}>
              value
            </progress>
          </div>
          <img src={pokeBimg} />
          <div className="actions">
            <button id="attack" disabled={true}>
              <div>Attack</div>
              <div>{pokemonB.base.Attack}</div>
            </button>
            <button id="defend" disabled={true}>
              <div>Defend</div>
              <div>{pokemonB.base.Defense}</div>
            </button>
            <button id="sattack" disabled={true}>
              <div>Special Attack </div>
              <div>{pokemonB.base["Sp. Attack"]}</div>
            </button>
            <button id="sdefend" disabled={true}>
              <div>Special Defense</div>
              <div>{pokemonB.base["Sp. Defense"]}</div>
            </button>
          </div>
        </div>
        <button id="fight" onClick={setupGame}>
          {inFight ? `Round ${round}` : "FIGHT"}
        </button>
        {inFight ? (
          <button id="stopfight" onClick={stopfight}>
            Stop Fight
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default GameScreen;
