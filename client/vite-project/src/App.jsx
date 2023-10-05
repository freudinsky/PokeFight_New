import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <img src="src/assets/poke_fight_logo.png" alt="" />
      <h1>
        R U READY
        <br />
        TO RUBBLE?
      </h1>
    </>
  );
}

export default App;
