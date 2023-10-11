function GameActions({ inFight, pokemon, handleAction, pokeIni }) {
  return (
    <div className={pokeIni.current === "A" ? "actions" : "actions hide"}>
      <div className="singlestat">
        <h3>{pokemon.name.english}</h3>
      </div>
      <button
        id="attack"
        onClick={() => handleAction("attack")}
        disabled={!inFight}
      >
        <div>Attack</div>
        <div>{pokemon.base.Attack}</div>
      </button>
      <button
        id="sattack"
        onClick={() => handleAction("sattack")}
        disabled={!inFight}
      >
        <div>Special Attack </div>
        <div>{pokemon.base["Sp. Attack"]}</div>
      </button>
      <div className="singlestat" id="defend">
        <div>Defense {pokemon.base.Defense}</div>
      </div>
      <div className="singlestat" id="sdefend">
        <div>Special Defense {pokemon.base["Sp. Defense"]}</div>
      </div>
    </div>
  );
}

export default GameActions;
