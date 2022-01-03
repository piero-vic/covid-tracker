import covidReducer, { getCovidData } from '../redux/covid/covid';

global.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve([1, 2, 3]),
  });
});

describe('covidReducer', () => {
  test('Reducer returns a new state after action is dispatched', () => {
    const state = {
      item1: {},
      item2: {},
      item3: {},
    };

    const newState = covidReducer(
      state,
      getCovidData({
        id: 'item4',
      }),
    );
    expect(newState).toBeInstanceOf(Object);
    expect(Object.keys(newState)).toHaveLength(4);
  });
});
