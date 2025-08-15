const cardArray = [
    { name: 'sol', img: 'https://s2.glbimg.com/t4Kki05tLP04s8tpjnDl_44E-pQ=/e.glbimg.com/og/ed/f/original/2019/12/16/4923566097_dc2a6217f8_h.jpg' },
    { name: 'sol', img: 'https://s2.glbimg.com/t4Kki05tLP04s8tpjnDl_44E-pQ=/e.glbimg.com/og/ed/f/original/2019/12/16/4923566097_dc2a6217f8_h.jpg' },
    { name: 'lua', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg' },
    { name: 'lua', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg' },
    { name: 'estrela', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dEPYp7n-AWwxBGps548xTuWz48C1xkSi_A&s' },
    { name: 'estrela', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dEPYp7n-AWwxBGps548xTuWz48C1xkSi_A&s' },
    { name: 'nuvem', img: 'https://static.vecteezy.com/ti/vetor-gratis/p1/48170083-nuvem-com-branco-fundo-ilustracao-desenho-animado-clipart-e-linha-arte-projeto-nuvem-ilustracao-desenho-animado-clipart-e-linha-arte-com-uma-branco-fundo-gratis-vetor.jpg' },
    { name: 'nuvem', img: 'https://static.vecteezy.com/ti/vetor-gratis/p1/48170083-nuvem-com-branco-fundo-ilustracao-desenho-animado-clipart-e-linha-arte-projeto-nuvem-ilustracao-desenho-animado-clipart-e-linha-arte-com-uma-branco-fundo-gratis-vetor.jpg' }
];

const grid = document.getElementById('grid');
let cardsChosen = [], cardsChosenId = [], cardsWon = [];

cardArray.sort(() => 0.5 - Math.random());

function createBoard() {
    cardArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', index);

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');

        cardElement.appendChild(front);
        cardElement.appendChild(back);

        cardElement.addEventListener('click', flipCard);
        grid.appendChild(cardElement);
    });
}

function flipCard() {
    const id = this.getAttribute('data-id');

    if (cardsChosenId.includes(id) || this.classList.contains('flip')) return;

    cardsChosen.push(cardArray[id].name);
    cardsChosenId.push(id);

    this.classList.add('flip');
    this.querySelector('.front').innerHTML = `<img src="${cardArray[id].img}" alt="${cardArray[id].name}" width="100%" height="100%">`;

    if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstId, secondId] = cardsChosenId;

    if (cardsChosen[0] === cardsChosen[1]) {
        cards[firstId].removeEventListener('click', flipCard);
        cards[secondId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    } else {
        cards[firstId].classList.remove('flip');
        cards[secondId].classList.remove('flip');
        cards[firstId].querySelector('.front').innerHTML = '';
        cards[secondId].querySelector('.front').innerHTML = '';
    }

    cardsChosen = [];
    cardsChosenId = [];

    if (cardsWon.length === cardArray.length / 2) {
        alert('Parabéns! Todos os pares foram encontrados!');
    }
}

createBoard();
