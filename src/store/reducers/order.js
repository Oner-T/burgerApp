import * as actionTypes from '../actions/actionTypes';
import  { updateObject } from '../utility';

const initialState = {
    orders: []
}




const orderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders
    } );
  

};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_SUCCESS: return orderSuccess(state, action)

        default:
            return state
    }
};

export default reducer;