import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";


class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name",
                },
                value: "",
                validation: {
                    required: false,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street",
                },
                value: "",
                validation: {
                    required: false,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP",
                },
                value: "",
                validation: {
                    required: false,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country",
                },
                value: "",
                validation: {
                    required: false,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "E-mail",
                },
                value: "",
                validation: {
                    required: false,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ]
                },
                value: "fastest",
                valid: true
            },

        },
        loading: false,
        formIsValid: false
    }

    orderHandler = (event) => {
        // to prevent form to reload page:
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        };
        const Order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        axios.post("/orders.json", Order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push("/");

            })
            .catch(err => {
                this.setState({ loading: false });
            })
    };

    checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedElement = {
            ...this.state.orderForm[inputIdentifier]
        }
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        updatedOrderForm[inputIdentifier] = updatedElement;
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })

    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        validationRequired={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => (
                            this.inputChangedHandler(event, formElement.id)

                        )}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>

        )
        if (this.state.loading) {
            form = <Spinner />

        }


        return (

            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>

        )
    }
};


const mapStateToProps = state => {
    return {
        ings: state.ings,
        price: state.totalPrice
    }
}


export default connect(mapStateToProps)(ContactData);