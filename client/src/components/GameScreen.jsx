import { useState, useEffect } from "react";
import "./GameScreen.css";

function GameScreen() {
  const [pokemonA, setPokemonA] = useState(); // Player
  const [pokemonB, setPokemonB] = useState(); // CPU

  return (
    <div className="GameContainer">
      <h1>Wo kommen die Pokemons her? Props vom Select Screen?</h1>
      <div>PokeMon A</div>
      <div>PokeMon B</div>
    </div>
  );
}

export default GameScreen;
