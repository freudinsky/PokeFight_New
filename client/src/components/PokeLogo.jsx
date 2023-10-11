import { Link } from "react-router-dom";

function PokeLogo() {
  return (
    <div className="logo">
      <Link to={"/"}>
        <img
          src="src/assets/poke_fight_logo.png"
          alt="Pokefight Logo"
          className="logo"
        />
      </Link>
    </div>
  );
}

export default PokeLogo;
