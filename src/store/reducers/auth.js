import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'


const initialState = {
    email: '',
    password: ''
}

const authFail = (state, action) => {


};

const authSuccess = (state, action) => {
    return updateObject(state)

};




const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAIL:
            return authFail(state, action)
        default:
            return state
    }
};

export default reducer;