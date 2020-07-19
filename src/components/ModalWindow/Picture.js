import React from 'react';

const Picture = (props) => {
    const styles = {
        background: `url(${props.url}), #c4c4c4`
    }
    return (
       <div className="modal-window-picture" style={styles}>

       </div>
    )
}

export default Picture;