const GET_COVID_DATA = 'covid/GET_COVID_DATA';
const CLEAR_DATA = 'covid/CLEAR_DATA';

const initialState = {};

const covidReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COVID_DATA:
      return { ...state, [action.payload.id]: action.payload };
    case CLEAR_DATA:
      return {};
    default:
      return state;
  }
};

export const getCovidData = (payload) => ({
  type: GET_COVID_DATA,
  payload,
});

export const clearCovidData = () => ({
  type: CLEAR_DATA,
});

export const fetchCovidData = (slug) => async (dispatch) => {
  const date = new Date();
  const dateString = date.toISOString().slice(0, 10);
  const response = await fetch(
    `https://api.covid19tracking.narrativa.com/api/${dateString}/country/us/region/${slug.replace(
      '-',
      '_',
    )}`,
  );
  const allData = await response.json();
  const covidData = allData.dates[dateString].countries.US.regions[0];
  dispatch(
    getCovidData({
      id: covidData.id,
      confirmed: covidData.today_confirmed,
      new_confirmed: covidData.today_new_confirmed,
      deaths: covidData.today_deaths,
      new_deaths: covidData.today_new_deaths,
      open_cases: covidData.today_open_cases,
      new_open_cases: covidData.today_new_open_cases,
      recovered: covidData.today_recovered,
      new_recovered: covidData.today_new_recovered,
      tests: covidData.today_tests,
      new_tests: covidData.today_new_tests,
      total_hospitalised_patients: covidData.today_total_hospitalised_patients,
      new_total_hospitalised_patients:
        covidData.today_new_total_hospitalised_patients,
    }),
  );
};

export default covidReducer;
