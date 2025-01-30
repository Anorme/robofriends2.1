import { combineReducers } from "@reduxjs/toolkit"
import searchReducer from "../components/features/search/searchSlice";
import robotsReducer from "../components/features/loadRobots/robotsSlice";

const rootReducer = combineReducers({
  search: searchReducer,
  load: robotsReducer,
})

export default rootReducer;