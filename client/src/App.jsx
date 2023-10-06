import { useState } from "react";
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
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokeDetail />} />
        <Route path="/pokemon/:id/:info" element={<PokeSuperDetail />} />
      </Routes>
    </>
  );
}

export default App;
