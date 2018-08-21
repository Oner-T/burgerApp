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
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,

    };

    componentWillMount() {
        this.setPurchasableState(this.state.ingredients);


    };


    setPurchasableState = (ingredients) => {

        const ingredientCount = Object.keys(ingredients)
            .map(el => {
                return ingredients[el]
            }).reduce((a, b) => a + b);

        this.setState({ purchasable: ingredientCount > 0 })

    };

    addIngredientHandler = (type) => {
        const beforeCount = this.state.ingredients[type];
        const afterCount = beforeCount + 1;
        const addedPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + addedPrice;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = afterCount;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.setPurchasableState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const beforeCount = this.state.ingredients[type];
        if (beforeCount <= 0) return;
        const afterCount = beforeCount - 1;
        const deductedPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - deductedPrice;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = afterCount;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
        this.setPurchasableState(updatedIngredients);

    };



    purchaseContinueHandler = () => {
        this.setState({ purchasing: true });

    };

    purchaseCancelHandler = () => {

        this.setState({ purchasing: false });


    };

    purchaseHandler = () => {

        this.setState({ purchasing: true });

    };



    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
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