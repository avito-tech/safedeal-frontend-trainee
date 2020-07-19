import React from 'react';

const Button= (props) => {
    return (
        <div onClick={props.toggleModalWindow}>
            <img className="close-btn" src="./assets/close-icon.svg" />
        </div>
    )
}

export default Button;