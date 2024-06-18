const cardsArray = [
    'img1', 'img1', 'img2', 'img2', 'img3', 'img3', 'img4', 'img4',
    'img5', 'img5', 'img6', 'img6', 'img7', 'img7', 'img8', 'img8'
];

const images = {
    img1: 'img/1.png',
    img2: 'img/2.png',
    img3: 'img/3.png',
    img4: 'img/4.png',
    img5: 'img/5.png',
    img6: 'img/6.png',
    img7: 'img/7.png',
    img8: 'img/8.png'
};

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const board = document.getElementById('game-board');
    shuffle(cardsArray);
    cardsArray.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const img = document.createElement('img');
        img.src = images[value];
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        disableCards();
        score += 10;
        updateScore();
        matches += 1;
        if (matches === cardsArray.length / 2) {
            setTimeout(() => alert('Você ganhou!'), 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = score;
}

document.addEventListener('DOMContentLoaded', createBoard);

document.getElementById('refresh-button').addEventListener('click', function() {
    location.reload();
});

