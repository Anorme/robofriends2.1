import { fetchRobots } from "./fetchRobots";
import store from "../../../store/store";

global.fetch = jest.fn()

describe('fetchRobots thunk', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should update the state with robots on successful fetch', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: "John Doe", email: "johndoe@gmail.com"}]
    });

   await store.dispatch(fetchRobots());

   const state  = store.getState();

   expect(state.load.robots).toEqual([{ id:1, name: "John Doe", email: "johndoe@gmail.com"}])   
  })

  it('should handle errors gracefully', async () => {
    fetch.mockRejectedValueOnce( new Error ('Error fetching robots'))

    await store.dispatch(fetchRobots());

    const state = store.getState();
    expect (state.load.robots).toEqual([]);
    expect (state.load.isPending).toBe(false);
    expect (state.load.error).toEqual('Error fetching robots')
  })


})