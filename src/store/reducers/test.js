import * as actionTypes from '../actions/actionTypes';

const initialState = {
  testList: [],
  loading: false,
};

const fetchTestStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchTestSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    testList: action.payload,
  };
};

const fetchTestFail = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TEST_START:
      return fetchTestStart(state, action);
    case actionTypes.FETCH_TEST_SUCCESS:
      return fetchTestSuccess(state, action);
    case actionTypes.FETCH_TEST_FAIL:
      return fetchTestFail(state, action);
    default:
      return state;
  }
};

export default reducer;
