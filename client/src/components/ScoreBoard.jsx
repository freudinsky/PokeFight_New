import { React, useEffect, useState } from "react";
import "./ScoreBoard.css";
import axios from "axios";

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

  useEffect(() => {
    if (games) {
      document.body.style.backgroundImage = "url(stadium.webp)"; // double check my quotes
    }
  }, [games]);

  return (
    <div
    /* style={{
        backgroundImage: `url(stadium.webp)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: 1000,
        width: 1000
      }} */
    >
      <h1>POKKEee HIGHSCORE</h1>
      {games.map((item) => (
        <h2>{`Winner: ${item.winner}, Turns: ${item.turns}, Date: ${item.date}`}</h2>
      ))}
    </div>
  );
}

export default ScoreBoard;
