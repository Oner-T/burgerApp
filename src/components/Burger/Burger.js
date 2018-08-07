import React, { Component } from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'



const burger = (props) => {

    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKeys => {
            return [...Array(props.ingredients[igKeys])]
                .map((_, i) => {
                    return <BurgerIngredient keys={igKeys + i} type={igKeys} />
                }).reduce((arr, el) => {
                    return arr.concat(el)
                }, []);
        });

    return (<div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
    </div>)

};

export default burger;

