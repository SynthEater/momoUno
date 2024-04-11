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
          game(turn); // Continue game after drawing
      } else {
          playCard(playerHands[turn - 1], cardChoice);
      }
  });
}
/*
function playCard(playerHand, playedCard) {
  const cardIndex = playerHand.indexOf(playedCard);
  if (cardIndex === -1) {
      console.log('Invalid card selection. Try again.');
      return;
  }

  if (livestack.length === 0) {
      // If livestack is empty, push the played card onto it
      livestack.push(playerHand.splice(cardIndex, 1)[0]);
      console.log('Card played successfully.');
      return;
  }

  const lastCard = livestack[0];
  if (!checkCard(lastCard, playedCard)) {
      console.log('Cannot play card. Try a different card or draw.');
      return;
  }

  livestack.unshift(playerHand.splice(cardIndex, 1)[0]); // Remove card from player's hand and put it on top of the live stack
  console.log('Card played successfully.');
}*/

function playCard(playerHand, playedCard) {
  const cardIndex = playerHand.indexOf(playedCard);
  if (cardIndex === -1) {
      console.log('Invalid card selection. Try again.');
      return;
  }

  if (livestack.length === 0) {
      // If livestack is empty, push the played card onto it
      livestack.push(playedCard);
  } else {
      const lastCard = livestack[0];
      if (!checkCard(lastCard, playedCard)) {
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


function checkCard(lastCard, card) {
  console.log('Last Card:', lastCard);
  console.log('Played Card:', card);

  const lastCardColor = lastCard[lastCard.length - 1]; // Extract last card color
  const cardColor = card[card.length - 1]; // Extract card color
  const lastCardValue = lastCard.substring(0, lastCard.length - 1); // Extract last card value
  const cardValue = card.substring(0, card.length - 1); // Extract card value

  console.log('Last Card Color:', lastCardColor);
  console.log('Card Color:', cardColor);
  console.log('Last Card Value:', lastCardValue);
  console.log('Card Value:', cardValue);

  // Check if the card matches the color or value of the last card
  return (lastCardColor === cardColor || lastCardValue === cardValue);
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

function turnOrder() {
  if (playedCard[0] === 'R') {
      clockwise = !clockwise;
  }
  if (playedCard[0] === 'D') {
      draw(turn);
      draw(turn);
  }
  if (playedCard[0] === 'Q') {
      draw(turn);
      draw(turn);
      draw(turn);
      draw(turn);
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