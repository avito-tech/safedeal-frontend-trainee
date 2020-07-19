import React from 'react';

import Item from './Item';

const List = (props) => {
    return (
        <div className="container-pictures">
            {props.pictures.map(el => {
                return <Item key={el.id} {...el} handleClick={props.handleClick}/>
            })}
        </div>
    )
}

export default List;