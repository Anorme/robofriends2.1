import reducer, {setError, setIsPending, setRobots} from "./robotsSlice";

describe('robotSlice', () => {
  const initialState = {
    robots: [],
    isPending: false,
    error: null
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('handles the robots state update', () => {
    expect(reducer(initialState, setRobots(['Leane', 'Clementine']))).toEqual({
      robots: ["Leane", "Clementine"],
      isPending: false,
      error: null
    })
  })

  it('handles the isPending state update', () => {
    expect(reducer(initialState, setIsPending(true))).toEqual({
      robots: [],
      isPending: true,
      error: null 
    })
  })

  it('handles the setError state update', () => {
    expect(reducer(initialState, setError("Unable to fetch robots"))).toEqual({
      robots: [],
      isPending: false,
      error: "Unable to fetch robots"
    })
  })

})