import { React, useEffect, useState } from "react";
import { format } from "date-fns";
import "./ScoreBoard.css";
import axios from "axios";
import PokeLogo from "./PokeLogo.jsx";

function ScoreBoard() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/game/leaderboard`)
      .then((res) => {
        const sortedGames = res.data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);

          return dateB - dateA;
        });

        setGames(sortedGames);
        console.log(sortedGames);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="ScoreBoardWrapper">
      <PokeLogo />
      <h1>HIGHSCORES</h1>
      <div className="ScoreContainer_outer">
        {games.map((item, index) => {
          const formattedDate = item.date
            ? format(new Date(item.date), "MMM dd, yyyy")
            : "";
          return (
            <div className="ScoreContainer" key={index}>
              <div className="ScoreContainer_stats">
                <h2>
                  Fight: {item.player1} VS {item.player2}
                </h2>
                <h2>Winner: {item.winner}</h2>
                <h2>Turns: {item.turns}</h2>
                <h2>Fight Date: {formattedDate}</h2>
              </div>
              <div className="ScoreContainer_img">
                <img src={item.img_Url} alt={item.winner}></img>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScoreBoard;
