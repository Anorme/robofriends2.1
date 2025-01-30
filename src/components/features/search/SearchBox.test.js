import {render, screen } from '@testing-library/react';
import { Provider  } from 'react-redux';
import userEvent from '@testing-library/user-event';
import store from '../../../store/store';
import SearchBox from './SearchBox';

test ('SearchBox dispatches setSearchField on input change', async () => {
  render(
    <Provider store={store}>
      <SearchBox />
    </Provider>
  );

  const input = screen.getByPlaceholderText('search robots');
  const testValue = "Leane";

  await userEvent.type(input, testValue);

  const updatedState = store.getState().search
  expect(updatedState.searchField).toBe(testValue);

})
