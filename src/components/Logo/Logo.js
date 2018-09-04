import React from 'react';
import classes from './Logo.css';
import BurgerLogo from '../../assets/images/burger-logo.png'


const logo = (props) => {

    return (<div className={classes.Logo} style={{height:props.height}}>
        <img src={BurgerLogo} alt='Logo' />
    </div>);

};


export default logo;



