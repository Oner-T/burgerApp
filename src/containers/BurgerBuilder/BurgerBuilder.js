import React, { Component } from 'react';

import Aux from '../../hoc/Aux1/Aux1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            cheese: 1,
            meat: 1,
            salad: 1,
            bacon: 1
        },

        purchasable: true
    };


    setPurchasableState = () => {


        
    };

    addIngredientHandler = (type) => {
        // const beforeCount = this.state[type];
        // if (beforeCount <= 0) return;
        // const afterCount = beforeCount + 1;
        // const updatedState = { ...this.state.ingredients };
        // this.setState = {}
    };

    removeIngredientHandler = () => {

    };



    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };
        return (<Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler} />
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice} />
        </Aux>);

    };

};


export default BurgerBuilder;