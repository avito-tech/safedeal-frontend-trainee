import { API_URL } from './config.js';
import { AJAX, openModal, modal, modalContainer, formatDate } from './helpers.js';

const imagesContainer = document.querySelector('.images');

const images = [];
const ids = [];
const date = new Date();
let imageID;


// Get and Render Images
(async function () {
    try {
        const data = await AJAX(API_URL);

        data.forEach((element) => {
            images.push(element.url);
            ids.push(element.id);
        });

        let markup = ``;
        for (let i = 0; i < images.length; i++) {
            markup += `<a href="${API_URL}/${ids[i]}"><img src="${images[i]}" /></a>`
        }

        imagesContainer.insertAdjacentHTML('afterbegin', markup);
    } catch (error) {
        console.log('Error: ' + error.message);
    }
})();

// Get ID of image
imagesContainer.addEventListener('click', checkId.bind(this));
function checkId(event) {
    event.preventDefault();

    const image = event.target.closest('img');
    if (!image) return;
    
    imageID = image.src.slice(-11, -8);
    getComments();
}

// Get comments 
async function getComments() {
    try {
        const data = await AJAX(`${API_URL}/${imageID}`);
        const [comments] = data.comments;

        renderModal(data, comments);
    } catch (error) {
        console.log('Error: ' + error.message);
    }
}

// Render modal window with comments
function renderModal(data, comments) {
    let date, markup;

    if (comments === undefined) {
        markup = `
            <div class="left-side">
                <img 
                src="${data.url}"
                alt="" />
                <form class="input-form" method="post">
                    <input type="text" class="input-name" placeholder="Ваше имя" />
                    <input type="text" class="input-comment" placeholder="Вам комментарий" />
                </form>
                <button type="submit" class="leave-comment">Оставить комментарий</button>
            </div>
            <div class="right-side">
                <p class="date"></p>
                <p class="comment"></p>
            </div>
    `;
    } else {
        date = new Date(comments.date);
        markup = `
            <div class="left-side">
                <img 
                src="${data.url}"
                alt="" />
                <form class="input-form" method="post">
                    <input type="text" class="input-name" placeholder="Ваше имя" />
                    <input type="text" class="input-comment" placeholder="Вам комментарий" >
                </form>
                <button type="submit" class="leave-comment">Оставить комментарий</button>
            </div>
            <div class="right-side">
                <p class="date">${formatDate(date)}</p>
                <p class="comment">${comments.text}</p>
            </div>
    `;
    }

    modalContainer.insertAdjacentHTML('afterbegin', markup);
    openModal();
}


// Leave a comment
modal.addEventListener('click', leaveComment.bind(this));
function leaveComment(event) {
    const btn = event.target.closest('.leave-comment');
    if (!btn) return;

    const inputName = document.querySelector('.input-name').value;
    const inputComment = document.querySelector('.input-comment').value;
    const form = document.querySelector('.input-form');

    const data = {};

    if (inputName.length > 0 && inputComment.length > 0) {
        data.name = inputName;
        data.comment = inputComment;

        renderComment(data);

        form.reset();
    } else alert('Заполните пожалуйста все поля!');
}

// Render comments
async function renderComment(data) {
    try {
        await AJAX(`${API_URL}/${imageID}/comments`, data);

        const side = document.querySelector('.right-side');
        let markup = `
            <p class="date">${formatDate(date)}</p>
            <p class="comment">${data.comment}</p>
        `;

        side.insertAdjacentHTML('afterbegin', markup);
    } catch (error) {
        console.error('Error: ' + error.message);
    }
}