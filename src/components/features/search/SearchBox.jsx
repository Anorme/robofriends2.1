import { useDispatch } from "react-redux";
import { setSearchField } from "./searchSlice";

const SearchBox = () => {
	const dispatch = useDispatch();

	const handleSearchChange = (event) => {
		dispatch(setSearchField(event.target.value));
	}

	return (
		<div className="pa2">
		<input
			className="pa3 ba b--green bg-lightest-blue" 
			type="search" 
			placeholder="search robots"
			onChange={handleSearchChange}
		/>
		</div>
	);
}

export default SearchBox;