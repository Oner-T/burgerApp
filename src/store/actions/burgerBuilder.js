import * as actionTypes from "./actionTypes";
import axios from "axios";



export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }

};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }

};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
        loading:false,
    };
};

export const initIngredientsFetchFail = () => {
    return {
        type: actionTypes.INITIAL_INGREDIENTS_FAIL,
    };
};


export const initIngredients = () => {
    return (dispatch) => {
        axios.get('https://burgerapp-react88.firebaseio.com/ingredients.json')
            .then((response) => {
                dispatch(setIngredients(response.data));
            })
            .catch(err => {
                dispatch(initIngredientsFetchFail());
            })
    }
};
