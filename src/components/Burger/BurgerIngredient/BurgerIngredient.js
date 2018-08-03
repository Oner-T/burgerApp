import React, { Components } from 'react'
import classes from './BurgerIngredient.css'

class BurgerIngredient extends Components {


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
            case 'Meat':
                return ingredient = <div className={classes.Meat}></div>;
            case 'Chesse':
                return ingredient = <div className={classes.Cheese}></div>;
            case 'Bacon':
                return ingredient = <div className={classes.Bacon}></div>;
            case 'Salad':
                return ingredient = <div className={classes.Salad}></div>;
            case 'bread-bottom':
                return ingredient = <div className={classes.BreadBottom}></div>;

            default:
                ingredient = null;

                return ingredient;
        };
    };
};

export default BurgerIngredient;