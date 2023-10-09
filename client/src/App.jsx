import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import PokeDetail from "./components/PokeDetail";
import PokeSuperDetail from "./components/PokeSuperDetail";
import GameScreen from "./components/GameScreen";
import ScoreBoard from "./components/ScoreBoard";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <img src="src/assets/poke_fight_logo.png" alt="" />
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
            <Link to={"/pokemon/:id"}>Pokemon Detail</Link>
            <Link to={"/pokemon/:id/:info"}>Pokemon Super Detail</Link>
            <Link to={"/game"}>Game Screen</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokeDetail />} />
        <Route path="/pokemon/:id/:info" element={<PokeSuperDetail />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </>
  );
}

export default App;
