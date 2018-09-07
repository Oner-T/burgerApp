import React, { Component } from 'react';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom'



class Auth extends Component {

    state = {
        userData: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your mail adress",
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
                    placeholder: "Your password",
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
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }

    }

    onChangeHandler = (event, inputIdentifier) => {
        const updatedUserData = {
            ...this.state.userData,
            [inputIdentifier]: {
                ...this.state.userData[inputIdentifier],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.userData[inputIdentifier].validation),
                touched: true
            }
        };
        this.setState({ userData: updatedUserData });

    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.userData.email.value, this.state.userData.password.value, this.state.isSignup);


    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }


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
    }



    render() {
        let formelements = [];
        for (let element in this.state.userData) {
            formelements.push({
                id: element,
                config: this.state.userData[element]
            })

        };
        let form = formelements.map(el => {
            return (
                <Input
                    label={el.config.elementConfig.placeholder}
                    key={el.id}
                    elementType={el.elementType}
                    value={el.value}
                    shouldValidate={el.config.validation}
                    touched={el.config.touched}
                    changed={(event) => this.onChangeHandler(event, el.id)}>
                </Input>)

        });

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }


        return (

            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>

            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.initAuth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
