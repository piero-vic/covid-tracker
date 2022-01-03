const GET_ALL_DATA = 'data/GET_ALL_DATA';

const initialState = [];

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DATA:
      return action.payload;
    default:
      return state;
  }
};

export const getAllData = (payload) => ({
  type: GET_ALL_DATA,
  payload,
});

export const fetchAllData = () => async (dispatch) => {
  const response = await fetch(
    'https://civilserviceusa.github.io/us-states/data/states.json',
  );
  const states = await response.json();
  dispatch(getAllData(states));
};

export default dataReducer;
