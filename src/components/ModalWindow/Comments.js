import React from 'react';

const Comments = (props) => {
    return (
        <div className="comments">
            {props.comments.map(el => {
                return (
                    <div key={el.id}>
                        <p className="date">{new Date(el.date).toLocaleDateString()}</p>
                        <p className="comment">{el.text}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Comments;