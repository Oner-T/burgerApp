import React from 'react';
import classes from './Button.css';

const button = (props) => ( <div>
        <button 
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked} 
        > 
        {props.children}
        </button>
    </div>);


export default button;