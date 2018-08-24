import React, { Component } from 'react';
import classes from './Modal.css';
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux1/Aux1";


class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {

        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;

    };

    render() {
        return (
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={this.props.show === false||null ? { display: "none" } : null}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
};

export default Modal;