import React, { Component } from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'



const Burger = (props) => {

    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKeys => {
            return [...Array(props.ingredients[type])]
                .map((_, i) => {
                    return <BurgerIngredient keys={igKeys + i} type={igKeys} />
                });
        });
};

