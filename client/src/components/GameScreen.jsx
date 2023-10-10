import { useState, useEffect } from "react";
import "./GameScreen.css";

function GameScreen() {
  const [pokemonA, setPokemonA] = useState(); // Player
  const [pokemonB, setPokemonB] = useState(); // CPU

  function setupGame() {
    // API get http://localhost:8000/pokemon/${id}/base
    // base:
    // {
    //   "HP": 60,
    //   "Attack": 62,
    //   "Defense": 63,
    //   "Sp. Attack": 80,
    //   "Sp. Defense": 80,
    //   "Speed": 60 //initiative: who starts
    // }
    //
    // GameLoop:
    // "Fight": Start
    //    countdown: 3, 2, 1
    //    check: health for win/lose condition
    //    action: attack / defend / spAttack / spDefense
  }

  return (
    <>
      <div className="GameContainer">
        <div className="poke" id="pokeA">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/725.png" />
        </div>
        <div className="poke" id="pokeB">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/715.png" />
        </div>
        <button id="fight">FIGHT</button>
      </div>
    </>
  );
}

export default GameScreen;
