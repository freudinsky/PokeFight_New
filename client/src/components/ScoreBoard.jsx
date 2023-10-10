import { React, useEffect, useState } from "react";
import "./ScoreBoard.css";
import axios from "axios";

function ScoreBoard() {
  useEffect(() => {
    axios.get("http://localhost:8000/game/leaderboard").then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      <h1>Hello from the ScoreBoard</h1>
    </div>
  );
}

export default ScoreBoard;
