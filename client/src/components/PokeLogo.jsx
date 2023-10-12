import { Link } from "react-router-dom";
import Logo from "../assets/poke_fight_logo.png";

function PokeLogo() {
  return (
    <div className="logo">
      <Link to={"/"}>
        <img src={Logo} alt="Pokefight Logo" className="logo" />
      </Link>
    </div>
  );
}

export default PokeLogo;
