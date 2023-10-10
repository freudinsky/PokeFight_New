import {Link} from "react-router-dom";
import "./Select.css"
function Home() {
	return (
		<>
			<div className="nav">
				<Link to={"/select"}>Start Game</Link>
				<Link to={"/highscore"}>Leaderboard</Link>
			</div>
		</>
	);
}

export default Home;
