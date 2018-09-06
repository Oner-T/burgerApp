import * as actionTypes from "./actionTypes";
import axios from "axios";



export const authSuccess=(data)=>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        data:data
    }

}

export const authFail=(data)=>{
    return {
        type: actionTypes.AUTH_FAIL
    }

}



export const initAuth = () => {
    return (dispatch) => {
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=[AIzaSyD1S7hs-uYNrfPpK8ZFgZjtC_JcmA3oRMk]')
            .then((response) => {
                console.log(response.data)
               // dispatch(authSuccess(response.data.idtoken));
            })
            .catch(err => {
                dispatch(authFail());
            })
    }
};
