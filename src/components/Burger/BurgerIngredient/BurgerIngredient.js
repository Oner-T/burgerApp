import React, { Component } from 'react'
import classes from './BurgerIngredient.css'
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {


    render() {
        let ingredient = null;

        switch (this.props.ingredient) {
            case 'bread-top':
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case 'Meat':
                ingredient = <div className={classes.Meat}></div>;
                break;
            case 'Chesse':
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case 'Bacon':
                ingredient = <div className={classes.Bacon}></div>;
                break;
            case 'Salad':
                ingredient = <div className={classes.Salad}></div>;
                break;
            case 'bread-bottom':
                ingredient = <div className={classes.BreadBottom}></div>;
                break;

            default:
                ingredient = null;

                return ingredient;
        };
    };
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;