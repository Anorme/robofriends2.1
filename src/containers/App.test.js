import { Provider } from "react-redux";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { fetchRobots } from "../components/features/loadRobots/fetchRobots";
import store from "../store/store";
import App from "./App";

jest.mock('../components/features/loadRobots/fetchRobots');

describe('App Component', () => {
  beforeEach(() => {
    fetchRobots.mockClear();
  })

  it ('should render the load state initially', () => {
    fetchRobots.mockImplementation( () => async (dispatch) => {
      dispatch({ type: "load/setIsPending", payload: true});
    });

    render(
      <Provider store={store}>
        <App  />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('should render the Robofrieds title and child component after fetch', async() => {
    fetchRobots.mockImplementation(() => async (dispatch) => {
        dispatch({ type: 'load/setIspending', payload: true});
        dispatch({ 
          type: 'load/setRobots', 
          payload: [{ id: 1, name: 'John Doe', email: 'johndoe@gmail.com'}]
        })
        dispatch({ type: 'load/setIsPending', payload: false})
    })

    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByText(/Robofriends/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/search robots/i)).toBeInTheDocument();
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    })
  });

  it ('should filter the robots based on user input', async () => {
    fetchRobots.mockImplementation(() => async (dispatch) => {
      dispatch({ type: 'load/setIsPending', payload: true});
      dispatch({ 
        type: 'load/setRobots',
        payload: [
          {id: 1, name: 'John Doe', email: 'johndoe@gmail.com'},
          {id: 2, name: 'Jane Doe', email: 'janedoe@gmail.com'}
        ]
      });
      dispatch({ type: 'load/setIsPending', payload: false });
    })

    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    await waitFor(() => expect(screen.getByText(/John Doe/i)).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument())

    const input = screen.getByPlaceholderText(/search robots/i);
    fireEvent.change(input, { target: { value: 'Jane' } });

    expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument()
  });

  it('should handle errors gracefully', async () => {
    fetchRobots.mockImplementation(() => async (dispatch) => {
      dispatch({ type: 'load/setIsPendng', payload: true });
      dispatch({ type: 'load/setError' , payload: 'Error fetching robots' });
      dispatch({ type: 'load/setIsPending', payload: false});
    })

    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    //Check for the loading state
    // await waitFor(() => expect(screen.getByText(/Loading/i)).toBeInTheDocument())
    
    //Check for the error state 
    await waitFor(() => {expect(screen.getByText(/Error fetching robots/i)).toBeInTheDocument()})
    expect(screen.queryByText(/John Doe/i)).not.toBeInTheDocument()

  })

})
