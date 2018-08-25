import React, { Component } from 'react';

import Aux from '../../hoc/Aux1/Aux1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false

    };

 
    componentDidMount() {


        axios.get("https://burgerapp-react88.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });



    };


    setPurchasableState = (ingredients) => {
        if (this.state.ingredients) {

            const ingredientCount = Object.keys(ingredients)
                .map(el => {
                    return ingredients[el]
                }).reduce((a, b) => a + b);

            this.setState({ purchasable: ingredientCount > 0 })
        };
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
        this.setState({ loading: true });

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,

            person: {
                name: "Oner",
                address: "kerem sok orman apt. no:12/2"
            },

            deliveryType: "fastest"
        }

        axios.post("/orders.json", order)
            .then(response => { this.setState({ loading: false, purchasing: false }) })
            .catch(err => { this.setState({ loading: false, purchasing: false }) })
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
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

};


export default withErrorHandler(BurgerBuilder, axios);