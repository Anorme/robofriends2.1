import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRobots } from '../components/features/loadRobots/fetchRobots'
import CardList from '../components/CardList';
import SearchBox from '../components/features/search/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

const App = () => {
	const searchField = useSelector((state) => state.search.searchField);
	const { robots, isPending, error } = useSelector((state) => state.load);
	const dispatch = useDispatch();
	
	useEffect(() => { 
		dispatch (fetchRobots())
	}, [dispatch])


	const filteredRobots = robots && robots.length > 0 ? robots.filter(robot => {
		return robot.name && robot.name.toLowerCase().includes((searchField || '').toLowerCase());
	}) : [];
	
	
	return(
		<div className="tc">
			{ isPending ? (<h1>Loading...</h1>) : 
					error ? (<h2>{error}</h2>) :
					(
						<div>
							<h1 className="f2">RoboFriends</h1>
							<SearchBox />
							<Scroll>
							<CardList robots={filteredRobots} />
							</Scroll>
						</div>
					)
			}
		</div>
	)
}

export default App;

