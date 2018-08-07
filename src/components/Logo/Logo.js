import React from 'react';
import classes from './Logo.css';
import BurgerLogo from '../../assets/images/burger-logo.png'


const logo = (props) => {

    <div className={classes.logo} style={{height:props.height}}>
        <img src={BurgerLogo}  />
    </div>

};


export default logo;



