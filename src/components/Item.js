import React from 'react';

const Item = (props) => {
    let { url, handleClick, id } = props;
    return (
        <div className="picture" onClick={handleClick}>
            <img id={id} src={url} />
        </div>
    )
}

export default Item;