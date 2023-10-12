function GameActions({ inFight, pokemon, handleAction, pokeIni }) {
  return (
    <div className={pokeIni.current === "A" ? "actions" : "actions hide"}>
      <div className="singlestat">
        <h3>{pokemon.name}</h3>
      </div>
      <button
        id="attack"
        onClick={() => handleAction("attack")}
        disabled={!inFight}
      >
        <div>Attack</div>
        <div>{pokemon.base.attack}</div>
      </button>
      <button
        id="sattack"
        onClick={() => handleAction("sattack")}
        disabled={!inFight}
      >
        <div>Special Attack </div>
        <div>{pokemon.base.sp_attack}</div>
      </button>
      <div className="singlestat" id="defend">
        <div>Defense {pokemon.base.defense}</div>
      </div>
      <div className="singlestat" id="sdefend">
        <div>Special Defense {pokemon.base.sp_defense}</div>
      </div>
    </div>
  );
}

export default GameActions;
