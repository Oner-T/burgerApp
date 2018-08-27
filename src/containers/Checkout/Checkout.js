import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"




class Checkout extends Component {
    state = {
        ingredients: null
    };

    componentWillMount() {

        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        };

        this.setState({ingredients:ingredients});



    }



    render() {



        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                />
            </div>
        )
    }


};



export default Checkout;