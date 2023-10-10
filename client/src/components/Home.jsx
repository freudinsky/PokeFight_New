import {Link} from "react-router-dom";
function Home() {
	return (
		<>
			<Link to={"/select"}>Start Game</Link>
			<Link to={"/highscore"}>Leaderboard</Link>
		</>
	);
}

export default Home;
