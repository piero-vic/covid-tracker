import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Home from '../components/Home';

import data from './__mocks__/data_mock.json';
import covid from './__mocks__/covid_mock.json';

describe('Home test', () => {
  const initialState = { data, covid };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  test('Renders correctly', () => {
    const homeComponent = render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );
    expect(homeComponent).toMatchSnapshot();
  });

  test('Renders 50 states', () => {
    const homeComponent = render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );
    const statesList = homeComponent.container.querySelector('ul');
    expect(statesList.children).toHaveLength(50);
  });

  test('Search bar filters the list of states', () => {
    const homeComponent = render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );
    const statesList = homeComponent.container.querySelector('ul');
    const searchBar = homeComponent.getByPlaceholderText('SEARCH');
    fireEvent.change(searchBar, { target: { value: 'ala' } });
    expect(statesList.children).toHaveLength(2);
  });
});
