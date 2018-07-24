import React from 'react';


const person = (props) => {
    return (
        <div>
            <div>{props.name}</div>
            <div>{props.age}</div>
            <button onClick={props.click}>Delete</button>
            <input onChange={props.change} value={props.name}></input>
        </div>
    )

};

export default person;