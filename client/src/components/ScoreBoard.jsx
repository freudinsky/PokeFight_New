import { React, useEffect, useState } from "react";
import "./ScoreBoard.css";
import axios from "axios";
import PokeLogo from "./PokeLogo";

function ScoreBoard() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/game/leaderboard")
      .then((res) => {
        setGames(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  /* useEffect(() => {
    if (games) {
      document.body.style.backgroundImage = "url(stadium.webp)"; // double check my quotes
    }
  }, [games]); */

  return (
    <div className="ScoreBoardWrapper">
      <PokeLogo />
      <h1>HIGHSCORE</h1>
      {games.map((item, index) => (
        <div className="ScoreContainer" key={index}>
          <h2>
            Fight: {item.player1} against {item.player2}
          </h2>
          <h2>Winner: {item.winner}</h2>
          <h2>Turns: {item.turns}</h2>
          <h4>Fight Date: {item.date}</h4>
          {/* <h2>{`Turns: ${item.turns}, Winner: ${item.winner}, Date: ${item.date}`}</h2> */}
        </div>
      ))}
    </div>
  );
}

export default ScoreBoard;
