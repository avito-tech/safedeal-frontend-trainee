import React from 'react';
import './index.css';

export const Input = ({ placeholder, onChange, type, isRequired, ...rest }) => {
    return (
        <input
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            className="input"
            required={isRequired ? 'required' : ''}
            {...rest}
        />
    );
};
