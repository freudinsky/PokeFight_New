import {Link} from "react-router-dom";
import PokeLogo from "./PokeLogo";

function Home() {
	return (
		<>
			<div className="HomeContainerWrapper">
				<PokeLogo />
				<div className="nav">
					<Link to={"/select"}>Start Game</Link>
					<Link to={"/highscore"}>Leaderboard</Link>
				</div>
			</div>
		</>
	);
}

export default Home;
