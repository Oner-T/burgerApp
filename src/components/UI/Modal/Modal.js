import React from 'react';
import classes from './Modal.css';
import Burger from '../../Burger/Burger'

const modal = (props) => {
    <div>
        <Burger>

        </Burger>
        Price: {props.price}
    </div>


};

export default modal;