import { TIMEOUT_SEC } from './config.js'

// Timer for catching long request
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(() => {
            reject(new Error(`Request took too long! Timeout after ${s} seconds.`))
        }, s * 1000);
    });
};

// Fetching data
export const AJAX = async function (url, uploadData = undefined) {
    try {
        const fetchPro = uploadData ?
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(uploadData)
            })
            : fetch(url);

        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        if (res.status === 200) {
            const data = await res.json();
            return data;
        }
    } catch (error) {
        console.log('Error: ' + error.message);
        // throw error;
    }
};

// Modal window
export const modal = document.querySelector('.modal');
export const modalContainer = document.querySelector('.modal-container');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

export const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    modalContainer.innerHTML = '';
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.classList.contains('.hidden')) {
        closeModal();
    }
});

// Formated Date
export const formatDate = function (date) {
    let day = date.getDate();
    if (day < 10) day = '0' + day;

    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;

    let year = date.getFullYear();

    return day + '.' + month + '.' + year;
}