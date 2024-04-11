const readline = require('node:readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let stack = [
  '1v', '2v', '3v', '4v', '5v', '6v', '7v', '8v', '9v', 'Rv', 'Sv', 'Qv', 'Dv',
  '1b', '2b', '3b', '4b', '5b', '6b', '7b', '8b', '9b', 'Rb', 'Sb', 'Qb', 'Db',
  '1j', '2j', '3j', '4j', '5j', '6j', '7j', '8j', '9j', 'Rj', 'Sj', 'Qj', 'Dj',
  '1r', '2r', '3r', '4r', '5r', '6r', '7r', '8r', '9r', 'Rr', 'Sr', 'Qr', 'Dr'
];

let j1 = [], j2 = [], j3 = [], j4 = [];

let playerHands = [j1, j2, j3, j4];

let livestack = [];
let NBCARDSSTART = 7;
let playedCard = '2j';
let turn = 1;
let clockwise = true;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function distribute() {
  // Place one card from the stack on top of the livestack
  livestack.push(stack.splice(getRandomInt(stack.length), 1)[0]);
  console.log('livestack', livestack);

  for (let i = 0; i < NBCARDSSTART; i++) {
      for (let j = 0; j < 4; j++) {
          playerHands[j].push(stack.splice(getRandomInt(stack.length), 1)[0]);
      }
  }
}

function draw(pl) {
  playerHands[pl - 1].push(stack.splice(getRandomInt(stack.length), 1)[0]);
}

function takeInput() {
  console.log('Your current hand: ' + playerHands[turn - 1].join(', '));
  readline.question('Player ' + turn + ', choose a card to play (or type "draw" to draw a card): ', cardChoice => {
      cardChoice = cardChoice.trim().toLowerCase();
      if (cardChoice === 'draw') {
          draw(turn);
          console.log('Current live stack:', livestack);
          turnChange(); // Move to the next player's turn
          takeInput(); // Prompt the next player for input
      } else {
          playCard(playerHands[turn - 1], cardChoice, livestack);
          console.log('Current live stack:', livestack);
          turnChange(); // Move to the next player's turn
          takeInput(); // Prompt the next player for input
      }
  });
}

function playCard(playerHand, playedCard, livestack) {
  const cardIndex = playerHand.indexOf(playedCard);
  if (cardIndex === -1) {
      console.log('Invalid card selection. Try again.');
      return;
  }

  if (livestack.length === 0) {
      // If livestack is empty, push the played card onto it
      livestack.push(playedCard);
  } else {
      if (!checkCard(livestack, playedCard)) {
          console.log('Cannot play card. Try a different card or draw.');
          return;
      }

      livestack.unshift(playedCard); // Put the played card on top of the live stack
  }

  // Remove the played card from the player's hand
  playerHand.splice(cardIndex, 1);

  console.log('Card played successfully.');
  console.log('Your current hand: ' + playerHands[turn - 1].join(', '));
  console.log('livestack', livestack);
}

function checkCard(livestack, card) {
  const cardColor = card[card.length - 1]; // Extract card color
  const cardValue = card.substring(0, card.length - 1); // Extract card value

  // Iterate over all cards in the livestack
  for (const lastCard of livestack) {
    const lastCardColor = lastCard[lastCard.length - 1]; // Extract last card color
    const lastCardValue = lastCard.substring(0, lastCard.length - 1); // Extract last card value

    // Check if the card matches the color or value of any card in the livestack
    if (lastCardColor === cardColor || lastCardValue === cardValue) {
      return true;
    }
  }

  return false; // If no match found in the entire livestack
}

function turnChange() {
  if (playedCard[0] === 'S') {
      turn += clockwise ? 2 : -2;
  } else {
      turn += clockwise ? 1 : -1;
  }
  if (turn < 1) {
      turn += 4;
  } else if (turn > 4) {
      turn -= 4;
  }
}

function checkWinCondition() {
  for (let i = 0; i < 4; i++) {
      if (playerHands[i].length === 0) {
          console.log(`Player ${i + 1} wins!`);
          return true;
      }
  }
  return false;
}

function game(pl) {
  distribute();
  takeInput();
}

game(turn);
