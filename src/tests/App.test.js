import React from 'react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import App from '../App';

import data from './__mocks__/data_mock.json';

describe('Application test', () => {
  const initialState = { data };
  const mockStore = configureStore();
  let store;

  it('Renders correctly', () => {
    store = mockStore(initialState);
    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
