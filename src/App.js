import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Input } from './components';
import { MODE } from './constants';
import './App.css';

const App = () => {
    const url = 'https://boiling-refuge-66454.herokuapp.com/images';
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imageData, setImageData] = useState({});
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            setData(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const getNowYear = () => {
        return new Date().getFullYear();
    };

    const clickImageHandler = async (ev) => {
        const id = parseInt(ev.target.dataset.id, 10);
        await fetchImageData(id);
        console.log(true);
    };

    const fetchImageData = async (id) => {
        try {
            const response = await fetch(`${url}/${id}`, { method: 'GET' });
            const data = await response.json();
            setImageData(data);
            setIsOpenModal(true);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    const getImageCards = (items) => {
        return items.map(({ id, url }) => {
            return <Card key={id} mode={MODE.EDIT} id={id} url={url} onClick={clickImageHandler} />;
        });
    };

    const inputChangeHandler = (ev) => {
        console.log(ev.target.value);
    };

    const setComments = () => {};

    if (isLoading) {
        return null;
    }

    return (
        <div className="App">
            <h1 className="App-title">TEST APP</h1>
            <main className="App-content">{getImageCards(data)}</main>
            {isOpenModal ? <Modal>Hello</Modal> : null}
            {/* <Button value="Оставить комментарий" onClick={setComments} /> */}
            {/* <Input type="text" placeholder="Ваше имя" onChange={inputChangeHandler} />
            <Input type="text" placeholder="Ваш комментарий" onChange={inputChangeHandler} /> */}

            <footer className="App-footer">
                <h5 className="App-footer-title">© 2018-{getNowYear()}</h5>
            </footer>
        </div>
    );
};

export default App;
