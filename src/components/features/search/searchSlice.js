import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: 'search',
  initialState: {searchField: ''},
  reducers: {
    setSearchField: (state, action) => {
      state.searchField = action.payload
    } 
  }
})

export const { setSearchField } = searchSlice.actions;
export default searchSlice.reducer;