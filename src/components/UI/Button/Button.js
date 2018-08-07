import React from 'react';
import classes from './Button.css';

const button = (props) => {

    <div>
        <button className={[classes.button, classes[props.btnType]].join(' ')} > </button>
    </div>


};

export default button;