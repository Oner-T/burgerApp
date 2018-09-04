import * as actionTypes from './actionTypes';
import axios from 'axios';




export const orderSuccess = (orders) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        orders: orders
    }
}


export const setOrder = () => {
    return (dispatch) => {
        axios.get('https://burgerapp-react88.firebaseio.com/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for ( let key in response.data ) {
                    fetchedOrders.push( {
                        ...response.data[key],
                        id: key
                    } );
                }
                dispatch(orderSuccess(fetchedOrders))
                console.log(fetchedOrders)
            })
            .catch(error => {

            })
    }
}



