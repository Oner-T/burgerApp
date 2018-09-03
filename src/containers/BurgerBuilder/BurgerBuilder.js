import React, { Component } from 'react';
import { connect } from "react-redux";

import Aux from '../../hoc/Aux1/Aux1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';





class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    };


    componentDidMount() {
        this.props.onSetIngredients();
    };


    setPurchasableState = (ingredients) => {
        if (this.props.ings) {

            const ingredientCount = Object.keys(ingredients)
                .map(el => {
                    return ingredients[el]
                }).reduce((a, b) => a + b);

            return ingredientCount >0;
        };
    };


    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: "/checkout"
        });
    };

    purchaseCancelHandler = () => {
        this.props.history.goBack();
        // this.setState({ purchasing: false });
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };



    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.setPurchasableState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
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


const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }

};

const mapDispatchToProps = dispatch => {

    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onSetIngredients: () => dispatch(actions.initIngredients()),
       
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));