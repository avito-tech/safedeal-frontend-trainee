import React from 'react';
import axios from 'axios';

class Form extends React.Component {
    state = {
        user: '',
        comment: '',
    }
    handleChange = (e) => {
        let {name, value} = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit = async(e) => {
        e.preventDefault();
        let postedData = {...this.state, date: new Date().getTime()};
        try {
           await axios.post(`https://boiling-refuge-66454.herokuapp.com/images/${this.props.activePicture.id}/comments`, postedData, (req,res) => {
            console.log(res);
           });
        } catch(error) {
            if (e.response.status === 400) alert('Ваш комментарий не сохронился');
        }
    }
    render() {
        return (
            <form className="comments-form" autoComplete="off">
                <input type="text" name="user" placeholder="Ваше Имя" onChange={this.handleChange} /><br />
                <input type="text" name="comment" placeholder="Ваш комментарий" onChange={this.handleChange} /><br />
                <button onClick={this.handleSubmit}>Оставить комментарий</button>
            </form>
        )
    }

}

export default Form;