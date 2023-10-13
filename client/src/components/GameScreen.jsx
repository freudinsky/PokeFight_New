import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button, ProgressBar, Modal } from "react-bootstrap";
import axios from "axios";
import PokeLogo from "./PokeLogo.jsx";
import "./GameScreen.css";

function GameScreen({ pokemonA, pokemonB }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const handleCloseCountdown = () => {
    setShowCountdown(false);
    setInFight((curr) => (curr = !curr));
  };
  const handleShowCountdown = () => setShowCountdown(true);
  const [ctDown, setCtDown] = useState(3);
  const resetCtDown = () => setCtDown(3);
  const [round, setRound] = useState(0);
  const [cpuQueue, setCpuQueue] = useState([]);
  const [inFight, setInFight] = useState(false);
  const [pokeAhp, setPokeAhp] = useState(0);
  const [pokeBhp, setPokeBhp] = useState(0);
  let pokeIni = useRef("");
  let winner = useRef("");
  const nav = useNavigate();

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
      handleShowCountdown();
    } else calculateRound();
  }

  function calculateRound() {
    if (pokeIni.current === "B") {
      if (cpuQueue.length === 0) {
        setTimeout(() => {
          handleAction("attack", true);
        }, 2000);
      } else {
        setTimeout(() => {
          handleAction("attack", true);
        }, 2000);
      }
    }
    setRound((curr) => (curr += 1));
  }

  function stopfight() {
    setInFight((curr) => (curr = !curr));
    setPokeAhp((curr) => (curr = pokemonA.base.hp));
    setPokeBhp((curr) => (curr = pokemonB.base.hp));
    resetCtDown();
  }

  function resetFight() {
    //winner.current = "";
    setRound((curr) => (curr = 0));
    setInFight((curr) => (curr = false));
    setPokeAhp((curr) => (curr = pokemonA.base.hp));
    setPokeBhp((curr) => (curr = pokemonB.base.hp));
    resetCtDown();
  }

  function saveWinner() {
    const sendHighscore = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/game/save`,
          winner.current
        );
        if (response.status === 201) {
        }
      } catch (error) {
        console.log("Error while saving! ", error);
      }
    };
    handleClose();
    sendHighscore();
    resetFight();
    //nav("/select");
  }

  function handleAction(action, cpu = false) {
    //TODO: order of checks: check first what kind of attack
    let att, satt, def, sdef, hp;
    if (cpu) {
      att = pokemonB.base.attack;
      satt = pokemonB.base.sp_attack;
      def = pokemonA.base.defense;
      sdef = pokemonA.base.sp_defense;
      hp = pokeAhp;
    }
    if (!cpu) {
      att = pokemonA.base.attack;
      satt = pokemonA.base.sp_attack;
      def = pokemonB.base.defense;
      sdef = pokemonB.base.sp_defense;
      hp = pokeBhp;
    }
    //TODO: refactor damage calculation
    // check matchup
    let relDamage = att;
    let factor = att / def;
    if (factor < 1) {
      relDamage = Math.floor(att * factor);
    } else {
      relDamage = att - def;
    }
    // relDamage = Math.abs(relDamage); // bugfix for now
    if (hp - relDamage <= 0) {
      if (cpu) {
        setPokeAhp((curr) => (curr = 0));
        winner.current = {
          result: "Lost",
          winner: pokemonB.name,
          player1: pokemonA.name,
          player2: pokemonB.name,
          turns: round,
          img_Url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonB.num}.png`,
        };
        handleShow();
        stopfight();
        return setInFight(false);
      }
      if (!cpu) {
        setPokeBhp((curr) => (curr = 0));
        winner.current = {
          result: "Won",
          winner: pokemonA.name,
          player1: pokemonA.name,
          player2: pokemonB.name,
          turns: round,
          img_Url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonA.num}.png`,
        };
        handleShow();
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

  const winnerModal = (
    <>
      <Modal
        className="winnerModal"
        show={show}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>{winner.current.winner} won!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Player {winner.current.result}</div>
          <div>
            {winner.current.player1} vs. {winner.current.player2}
          </div>
          <div>Rounds: {winner.current.turns}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={saveWinner}>
            Save Highscore
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      //just wait, ok?
    }, 1000);
    ctDown > 0 && setTimeout(() => setCtDown((curr) => (curr -= 1)), 1000);
    const timeout2 = setTimeout(() => {
      //just wait, ok?
    }, 500);
    if (ctDown === 0) {
      handleCloseCountdown();
      clearTimeout(timeout1);
      return () => clearTimeout(timeout2);
    }
  }, [ctDown]);

  const countdownModal = (
    <>
      <Modal
        className="countdownModal"
        show={showCountdown}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <h2>The fight starts in</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{ctDown}</h3>
        </Modal.Body>
        <Modal.Footer>
          <h2>{pokeIni.current === "A" ? "Player starts" : "CPU starts"}</h2>
        </Modal.Footer>
      </Modal>
    </>
  );

  return (
    <>
      {pokemonA && pokemonB ? (
        <div className="GameContainerWrapper">
          <PokeLogo />
          <div className="GameContainer">
            <div className="pokeA name">
              <h3>{pokemonA.name}</h3>
            </div>
            <div className="pokeB name">
              <h3>{pokemonB.name}</h3>
            </div>
            {inFight && (
              <div
                className={pokeIni.current === "A" ? "actions" : "actions hide"}
              >
                <button
                  id="attack"
                  onClick={() => handleAction("attack")}
                  disabled={!inFight}
                >
                  Attack
                </button>
                <button
                  id="sattack"
                  onClick={() => handleAction("sattack")}
                  disabled={!inFight}
                >
                  Special Attack
                </button>
              </div>
            )}
            <div className="poke" id="pokeA">
              <div className={inFight ? "stats" : "stats hide"}>
                <ProgressBar
                  variant="success"
                  now={pokeAhp}
                  max={pokemonA.base.hp}
                  label={`${pokeAhp}`}
                  className="hpbar"
                />
              </div>
              <img
                src={pokemonA.picture}
                className={pokeIni.current === "A" ? "pokeA" : "pokeA disabled"}
              />
              {inFight && (
                <div className="stats">
                  <div className="singlestat">
                    <div>Health</div>
                    <div>{pokemonA.base.hp}</div>
                  </div>
                  <div className="singlestat">
                    <div>Attack</div>
                    <div>{pokemonA.base.attack}</div>
                  </div>
                  <div className="singlestat">
                    <div>Special Attack </div>
                    <div>{pokemonA.base.sp_attack}</div>
                  </div>
                  <div className="singlestat" id="defend">
                    <div>Defense</div>
                    <div>{pokemonA.base.defense}</div>
                  </div>
                  <div className="singlestat" id="sdefend">
                    <div>Special Defense</div>
                    <div>{pokemonA.base.sp_defense}</div>
                  </div>
                </div>
              )}
            </div>
            <div className="poke" id="pokeB">
              <div className={inFight && inFight ? "stats" : "stats hide"}>
                <ProgressBar
                  variant="success"
                  now={pokeBhp}
                  max={pokemonB.base.hp}
                  label={`${pokeBhp}`}
                  className="hpbar"
                />
              </div>
              <img
                src={pokemonB.picture}
                className={
                  pokeIni.current === "B" ? "pokeB " : "pokeB disabled"
                }
              />
              {inFight && (
                <>
                  <div className="stats">
                    <div className="singlestat">
                      <div>Health</div>
                      <div>{pokemonB.base.hp}</div>
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

            {inFight ? (
              <>
                <div id="rounds">Round {round}</div>
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
        </div>
      ) : (
        ""
      )}
      {countdownModal}
      {winnerModal}
    </>
  );
}

export default GameScreen;
