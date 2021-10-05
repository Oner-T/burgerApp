import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const fetchTest = () => {
  return (dispatch) => {
    dispatch(fetchTestStart());
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        console.log(res);
        dispatch({
          type: actionTypes.FETCH_TEST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(fetchTestFail(err));
      });
  };
};

export const fetchTestFail = (error) => {
  return {
    type: actionTypes.FETCH_TEST_FAIL,
    error: error,
  };
};

export const fetchTestStart = () => {
  return {
    type: actionTypes.FETCH_TEST_START,
  };
};
