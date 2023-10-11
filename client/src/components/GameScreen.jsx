import { useState, useEffect } from "react";
import "./GameScreen.css";

function GameScreen() {
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
    //    countdown: 3, 2, 1
    //    check: health for win/lose condition
    //    action: attack / defend / spAttack / spDefense
  }

  useEffect(() => {
    setPokeAhp((curr) => (curr = pokemonA.base.HP));
    setPokeBhp((curr) => (curr = pokemonB.base.HP));
  }, []);

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
            <button id="attack">Attack ({pokemonA.base.Attack})</button>
            <button id="defend">Defend ({pokemonA.base.Defense})</button>
            <button id="sattack">
              Special Attack ({pokemonA.base["Sp. Attack"]})
            </button>
            <button id="sdefend">
              Special Defense ({pokemonA.base["Sp. Defense"]})
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
            <button id="attack">Attack ({pokemonB.base.Attack})</button>
            <button id="defend">Defend ({pokemonB.base.Defense})</button>
            <button id="sattack">
              Special Attack ({pokemonB.base["Sp. Attack"]})
            </button>
            <button id="sdefend">
              Special Defense ({pokemonB.base["Sp. Defense"]})
            </button>
          </div>
        </div>
        <button id="fight">FIGHT</button>
      </div>
    </>
  );
}

export default GameScreen;
