import React from 'react';
import classes from './Backdrop.css';



const backdrop = (props) => {
    return (
        <div className={classes.Backdrop}
            style={props.show === false ? { display: "none" } : null}
            onClick={props.clicked}
            >
        </div>
    )


};


export default backdrop;