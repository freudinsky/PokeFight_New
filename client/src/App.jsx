import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import GameScreen from "./components/GameScreen";
import Home from "./components/Home";
import PokeDetail from "./components/PokeDetail";
import PokeSuperDetail from "./components/PokeSuperDetail";
import ScoreBoard from "./components/ScoreBoard";
import Select from "./components/Select";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
/* import ScoreBoard from "./components/ScoreBoard"; */

function App() {
  const [userSelection, setUserSelection] = useState();
  const [cpuSel, setCpuSel] = useState()
console.log(cpuSel, userSelection)
  return (
		<>
			{/* <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
            <Link to={"/pokemon/:id"}>Pokemon Detail</Link>
            <Link to={"/pokemon/:id/:info"}>Pokemon Super Detail</Link>
            <Link to={"/game"}>Game Screen</Link>
          </li>
        </ul>
      </nav> */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/pokemon/:id" element={<PokeDetail />} />
				<Route path="/pokemon/:id/:info" element={<PokeSuperDetail />} />
				<Route
					path="/game"
					element={<GameScreen pokemonA1={userSelection} pokemonB1={cpuSel}/>}
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
