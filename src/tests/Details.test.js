import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Details from '../components/Details';

import data from './__mocks__/data_mock.json';
import covid from './__mocks__/covid_mock.json';

describe('Details test', () => {
  const initialState = { data, covid };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  test('Renders correctly', () => {
    const detailsComponent = render(
      <Provider store={store}>
        <Router>
          <Details region={data[0]} />
        </Router>
      </Provider>,
    );
    expect(detailsComponent).toMatchSnapshot();
  });

  test('Renders two lists of information', () => {
    const detailsComponent = render(
      <Provider store={store}>
        <Router>
          <Details region={data[0]} />
        </Router>
      </Provider>,
    );
    const [generalInformation, covidInformation] = detailsComponent.container.querySelectorAll('ul');
    expect(generalInformation.children).toHaveLength(3);
    expect(covidInformation.children).toHaveLength(12);
  });

  test('Renders information correctly', () => {
    const detailsComponent = render(
      <Provider store={store}>
        <Router>
          <Details region={data[0]} />
        </Router>
      </Provider>,
    );

    const populationNumber = detailsComponent.getByText('Population').nextSibling;
    expect(populationNumber.textContent).toBe('4,833,722');

    const confirmed = detailsComponent.getByText('Confirmed').nextSibling;
    expect(confirmed.textContent).toBe('863,170');
  });
});
