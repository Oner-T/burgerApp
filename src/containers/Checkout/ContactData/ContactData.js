import React, { Component } from "react";
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
                value: ""
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street",
                },
                value: ""
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP",
                },
                value: ""
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country",
                },
                value: ""
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "E-mail",
                },
                value: ""
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ]
                },
                value: ""
            },
        },
        loading: false
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
            ingredients: this.props.ingredients,
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedElement = {
            ...this.state.orderForm[inputIdentifier]
        }
        updatedElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedElement;
        this.setState({ orderForm: updatedOrderForm })

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
            <form className={classes.ContactData} onSubmit={(event) => this.orderHandler(event)}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => (
                            this.inputChangedHandler(event, formElement.id)

                        )}
                    />
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>

        )
        if (this.state.loading) {
            form = <Spinner />

        }


        return (
            <div>{form}</div>

        )
    }
};

export default ContactData;