import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import Button from '../../components/UI/Button/Button';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';



class BurgerBuilder extends Component {

    state = {
        ingredients: {
            Cheese: 1,
            Meat: 1,
            Salad: 1,
            Bacon: 1
        },

        purchasable: true
    };

    addIngredientHandler = (type) => {
        const beforeCount = this.state[type];
        if (beforeCount <= 0) return;
        const afterCount = beforeCount + 1;
        const updatedState = { ...this.state.ingredients };
        this.setState = {}
    };

    removeIngredientHandler = {

    };



    render() {
        return (<div>
            <Burger>
            </Burger>
            <BuildControls />
        </div>);

    };

};


export default BurgerBuilder;