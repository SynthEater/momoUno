const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Stack of cards
let stack = [
    '1v','2v','3v','4v','5v','6v','7v','8v','9v', 'Rv', 'Sv', 'Qv', 'Dv',
    '1b','2b','3b','4b','5b','6b','7b','8b','9b', 'Rb', 'Sb', 'Qb', 'Db',
    '1j','2j','3j','4j','5j','6j','7j','8j','9j', 'Rj', 'Sj', 'Qj', 'Dj',
    '1r','2r','3r','4r','5r','6r','7r','8r','9r', 'Rr', 'Sr', 'Qr', 'Dr'
];

// Arrays represent players' hands
let players = [[], [], [], []];

// Number of cards dealt at the beginning
const NUM_CARDS_START = 7;

// Livestack where cards are played
let livestack = [];

// Indicates the current player's turn
let currentPlayerIndex = 0;

// Indicates the direction of play (clockwise by default)
let clockwise = true;

// Function to shuffle the stack
function shuffle(stack) {
    for (let i = stack.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [stack[i], stack[j]] = [stack[j], stack[i]];
    }
}

// Function to deal cards to players
function dealCards() {
    for (let i = 0; i < NUM_CARDS_START; i++) {
        for (let j = 0; j < players.length; j++) {
            players[j].push(stack.pop());
        }
    }
}

// Function to determine if a card can be played
function canPlayCard(playedCard, currentCard) {
    return playedCard[0] === currentCard[0] || playedCard[1] === currentCard[1];
}

// Function to handle skipping a turn
function skipTurn() {
    currentPlayerIndex = getNextPlayerIndex();
}

// Function to get the next player's index based on the direction of play
function getNextPlayerIndex() {
    if (clockwise) {
        return (currentPlayerIndex + 1) % players.length;
    } else {
        return currentPlayerIndex === 0 ? players.length - 1 : currentPlayerIndex - 1;
    }
}

// Function to handle playing a card
function playCard(playedCardIndex) {
    const playedCard = players[currentPlayerIndex][playedCardIndex];
    if (!playedCard) {
        console.log("Invalid card index.");
        return;
    }

    if (!canPlayCard(playedCard, livestack[0])) {
        console.log("You cannot play this card.");
        return;
    }

    livestack.unshift(players[currentPlayerIndex].splice(playedCardIndex, 1)[0]);
    console.log(`Player ${currentPlayerIndex + 1} played ${playedCard}.`);
    
    // Check for special card effects
    handleSpecialCard(playedCard);
    
    // Move to the next player
    currentPlayerIndex = getNextPlayerIndex();
}

// Function to handle special card effects
function handleSpecialCard(playedCard) {
    switch (playedCard[0]) {
        case 'R':
            clockwise = !clockwise;
            break;
        case 'S':
            skipTurn();
            break;
        case 'D':
            for (let i = 0; i < 2; i++) {
                players[getNextPlayerIndex()].push(stack.pop());
            }
            break;
        case 'Q':
            for (let i = 0; i < 4; i++) {
                players[getNextPlayerIndex()].push(stack.pop());
            }
            break;
        default:
            break;
    }
}

// Function to display the current livestack and player's hand
function displayGameStatus() {
    console.log(`Livestack: ${livestack[0]}`);
    console.log(`Your Hand: ${players[currentPlayerIndex]}`);
}

// Main game loop
function gameLoop() {
    console.log(`Player ${currentPlayerIndex + 1}'s turn:`);
    displayGameStatus();

    rl.question('Enter the index of the card you want to play (or type "draw" to draw a card): ', (input) => {
        if (input.toLowerCase() === 'draw') {
            players[currentPlayerIndex].push(stack.pop());
            console.log(`You drew a card. Your Hand: ${players[currentPlayerIndex]}`);
            currentPlayerIndex = getNextPlayerIndex();
            gameLoop();
        } else {
            const playedCardIndex = parseInt(input);
            playCard(playedCardIndex);
            gameLoop();
        }
    });
}

// Initialize the game
shuffle(stack);
dealCards();
livestack.push(stack.pop());

// Start the game loop
gameLoop();



    function checkWinCondition()
     {
        for (let i = 0; i < players.length; i++) {
            if (players[i].length === 0) {
                console.log(`Player ${i + 1} wins!`);
                process.exit(); // Exit the game
            }
        }
    }
    

