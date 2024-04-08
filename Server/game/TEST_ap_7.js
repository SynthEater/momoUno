const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let stack = [
    '1v', '2v', '3v', '4v', '5v', '6v', '7v', '8v', '9v', 'Rv', 'Sv', 'Qv', 'Dv',
    '1b', '2b', '3b', '4b', '5b', '6b', '7b', '8b', '9b', 'Rb', 'Sb', 'Qb', 'Db',
    '1j', '2j', '3j', '4j', '5j', '6j', '7j', '8j', '9j', 'Rj', 'Sj', 'Qj', 'Dj',
    '1r', '2r', '3r', '4r', '5r', '6r', '7r', '8r', '9r', 'Rr', 'Sr', 'Qr', 'Dr'
];

let j1 = [];
let j2 = [];
let j3 = [];
let j4 = [];

let pl1;

let playerHands = [j1, j2, j3, j4];

let livestack = [];

let NBCARDSSTART = 7;

let playedCard = '2j';

let turn = 1;

let activePlayer = turn;

let indexToChop;

let clockwise = true;

let data;

function printStack() {
    console.log('stack: ' + stack);
}

function printLiveStack() {
    console.log('live card: ' + livestack[0]);
}

function printHand(pl) {
    switch (pl) {
        case 1:
            console.log('main j1: ' + j1);
            break;
        case 2:
            console.log('main j2: ' + j2);
            break;
        case 3:
            console.log('main j3: ' + j3);
            break;
        case 4:
            console.log('main j4: ' + j4);
            break;
        default:
            console.log('enter 1, 2, 3, 4');
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function turn1stCard() {
    let firstCard = stack.splice(getRandomInt(stack.length), 1);
    livestack.push(firstCard);
}

function distribute() {
    for (let i = 0; i < NBCARDSSTART; i++) {
        for (let j = 0; j < playerHands.length; j++) {
            playerHands[j].push(stack.splice(getRandomInt(stack.length), 1)[0]);
        }
    }
}

function takeInput() {
    readline.question('Player ' + turn + ', choose a card to play (or type "draw" to draw a card): ', cardChoice => {
        if (cardChoice.toLowerCase() === 'draw') {
            draw(turn);
        } else {
            playedCard = cardChoice.trim().toLowerCase();
            playCard();
        }
    });
}

function checkIndexNumber(joueur) {
    for (let i = 0; i < joueur.length; i++) {
        if (playedCard == joueur[i]) {
            indexToChop = i;
            return true;
        }
    }
    console.log('vous ne possedez pas cette carte');
    return false;
}

function turnOrder() {
    if (playedCard[0] == 'R') {
        clockwise = !clockwise;
    }
    if (playedCard[0] == 'S') {
        skipTurn();
    }
    if (playedCard[0] == 'D') {
        draw(turn);
        draw(turn);
    }
    if (playedCard[0] == 'Q') {
        for (let i = 0; i < 4; i++) {
            draw(turn);
        }
    }
}

function turnChange() {
    if (playedCard[0] === 'S' || (playedCard[0] === 'R' && clockwise)) {
        turn = (turn % 4) + 1;
    } else if (playedCard[0] === 'R' && !clockwise) {
        turn = (turn === 1) ? 4 : turn - 1;
    }
}

function skipTurn(){
    if(!clockwise){
        turn -2;
    }else
        turn +2;
  }

function playCard() {
    if (checkIndexNumber(playerHands[turn - 1])) {
        if (checkCard(livestack[0], playedCard)) {
            livestack.unshift(playerHands[turn - 1].splice(indexToChop, 1)[0]);
            console.log('la carte a ete jouee');
            turnOrder();
            turnChange();
        } else {
            console.log('Invalid card. Try again.');
        }
    }
}

function checkCard(lastCard, card) {
    const lastCardColor = lastCard[lastCard.length - 1];
    const cardColor = card[card.length - 1];
    const lastCardValue = lastCard.substring(0, lastCard.length - 1);
    const cardValue = card.substring(0, card.length - 1);

    return (lastCardColor === cardColor || lastCardValue === cardValue);
}

function mainLoop() {
    distribute();
    turn1stCard();
    while (true) {
        if (checkWinCondition()) {
            break;
        }
        printHand(turn);
        takeInput();
    }
}

function checkWinCondition() {
    for (let i = 0; i < playerHands.length; i++) {
        if (playerHands[i].length === 0) {
            console.log(`Player ${i + 1} wins!`);
            return true;
        }
    }
    return false;
}

mainLoop();
