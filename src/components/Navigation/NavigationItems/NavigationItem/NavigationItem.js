import React from 'react';

import classes from './NavigationItem.css';
import {Link} from "react-router-dom";

const navigationItem = ( props ) => (
    <li className={classes.NavigationItem}>
        <Link to={props.link} className={props.active ? classes.active : null}>{props.children}</Link>
    </li>
);

export default navigationItem;