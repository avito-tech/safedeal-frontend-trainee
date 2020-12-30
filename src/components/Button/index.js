import React from 'react';
import './index.css';

export const Button = ({ onClick, value, ...rest }) => {
    return (
        <button onClick={onClick} className="Button-base" {...rest}>
            {value}
        </button>
    );
};
