import React, { Component } from 'react';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';



class Auth extends Component {

    state = {
        userData: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Mail Adress",
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
            password: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Password",
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
        },
        loading: false
    }

    componentDidMount() {


    }

    onChangeHandler = (event, inputIdentifier) => {
        const updatedState = { ...this.state.userData };
        const updatedInputConfig = { ...updatedState[inputIdentifier] };
        updatedInputConfig.value = event.target.value;
        this.setState({ value: updatedInputConfig.value })

    };



    switchSignInHandler = () => {

    }



    render() {
        let formelements = [];
        for (let element in this.state.userData) {
            formelements.push({
                id: element,
                config: this.state.userData[element]
            })

        }


        return (

            <div className={classes.Auth}>
                {console.log(formelements)}
                <form>
                    {formelements.map(el => {
                        return (
                            <Input
                                key={el.id}
                                elementType={el.elementType}
                                value={el.value}
                                changed={(event) => this.onChangeHandler(event, el.id)}>
                            </Input>)
                    })}
                </form>
                <Button type></Button>
            </div>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: dispatch(actions.initAuth())
    }
}


export default connect(null, mapDispatchToProps)(Auth);
