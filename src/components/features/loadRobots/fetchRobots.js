import { setRobots, setError, setIsPending } from './robotsSlice';

//thunk function
export const fetchRobots = () => async dispatch => {
  dispatch(setIsPending(true));

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok){
      throw new Error ('Network response was not ok');
    }

    const data = await response.json()
    dispatch(setRobots(data))
  } catch (error) {
    dispatch(setRobots([]))
    dispatch(setError(error.message))
  } finally{
    dispatch(setIsPending(false));
  }
}