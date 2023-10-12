import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import GameScreen from "./components/GameScreen.jsx";
import Home from "./components/Home.jsx";
import PokeDetail from "./components/PokeDetail.jsx";
import PokeSuperDetail from "./components/PokeSuperDetail.jsx";
import ScoreBoard from "./components/ScoreBoard.jsx";
import Select from "./components/Select.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
/* import ScoreBoard from "./components/ScoreBoard"; */

function App() {
  const [userSelection, setUserSelection] = useState();
  const [cpuSel, setCpuSel] = useState();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokeDetail />} />
        <Route path="/pokemon/:id/:info" element={<PokeSuperDetail />} />
        <Route
          path="/game"
          element={<GameScreen pokemonA={userSelection} pokemonB={cpuSel} />}
        />
        <Route
          path="/select"
          element={
            <Select
              selection={userSelection}
              setUserSelection={setUserSelection}
              setCPU={setCpuSel}
            />
          }
        />
        <Route path="/highscore" element={<ScoreBoard />} />
      </Routes>
    </>
  );
}

export default App;
