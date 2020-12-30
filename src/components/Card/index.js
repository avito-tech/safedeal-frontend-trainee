import React from 'react';
import { MODE } from './../../constants';
import './index.css';

export const Card = ({ mode, id = '', url = '', onClick }) => {
    return (
        <img
            className="Card-image"
            data-id={id}
            src={url}
            {...(mode === MODE.EDIT ? (onClick = { onClick }) : '')}
        />
    );
};
