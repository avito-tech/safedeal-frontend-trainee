import React from 'react';
import './index.css';

export const Modal = ({ children }) => {
    console.log(children);
    return <div className="modal">{children}</div>;
};
