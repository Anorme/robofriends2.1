import { createSlice } from "@reduxjs/toolkit";

//create slice to manage robot loading state
const robotsSlice = createSlice({
  name: 'load',
  initialState: {
    robots: [],
    isPending: false,
    error: null
  },
  reducers: {
    setIsPending: (state, action) => {state.isPending = action.payload},
    setRobots: (state, action) => {state.robots = action.payload},
    setError: (state, action) => {state.error = action.payload}
  }
})


//Export actions
export const { setIsPending, setRobots, setError } = robotsSlice.actions;
//export reducer to store
export default robotsSlice.reducer;