import React from 'react';
import axios from 'axios';

import List from './List';
import './styles.css';
import ModalWindow from './ModalWindow/ModalWindow';

class App extends React.Component {
    state = {
        pictures: [],
        isModal: false,
        activePicture: {},
        comments: [],
        isMobile: false,
    };
    handleClick = async(e) => {
        let { id } = e.target;
        try {
            const res = await axios(`https://boiling-refuge-66454.herokuapp.com/images/${id}`);
            const activePicture = res.data;
            this.setState({ activePicture, isModal: true });
        } catch (e) {
            throw e;
        }
    }
    toggleModalWindow = () => {
        this.setState({ isModal: !this.state.isModal});
    }
    async componentDidMount() {
        window.addEventListener('resize', () => {
           this.setState({ isMobile: window.innerWidth <= 640 })
        })
        try {
            const res = await axios('https://boiling-refuge-66454.herokuapp.com/images');
            const pictures = res.data;
            this.setState({ pictures }); // its bad to use 2 setState
        } catch (e) {
            throw e;
        }
    }

    render() {
        let { activePicture, pictures, isModal, isMobile } = this.state;
        return (
            <div>
                <List pictures={pictures} handleClick={this.handleClick} />
                {isModal && <ModalWindow activePicture={activePicture} isMobile={isMobile} toggleModalWindow={this.toggleModalWindow} />}
            </div>
        )
    }
}

export default App;