import React from 'react';

import Form from './Form';
import Comments from './Comments';
import Button from './Button';


const ModalWindow = (props) => {
    let { url, comments } = props.activePicture;

    return props.isMobile ? (
        <div className="modal-window-mobile" >
            <div className="modal-window-picture-mobile" style={{background: `url(${url}) no-repeat 100% 100%`}}></div>
            <Button toggleModalWindow={props.toggleModalWindow} />
            <div className="modal-window__wrapper">
                <Comments comments={comments} />
                <Form />
            </div>
        </div>
    )
    :
    (
        <>
    <div className="modal-window-overlay"></div>
    <div className="modal-window">
        <div className="modal-window__wrapper">
            <div className="modal-window-picture">
                <div>
                    <img className="active-picture" src={url} />
                </div>
                <Form />
            </div>
            <Comments comments={comments} />
            <Button toggleModalWindow={props.toggleModalWindow} />
        </div>
    </div>
    </>
    );
}

export default ModalWindow;