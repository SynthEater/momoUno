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

/*

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
          const cardPlayedSuccessfully = playCard(playerHands[turn - 1], cardChoice, livestack);
          if (!cardPlayedSuccessfully) {
              // If the card couldn't be played, prompt the same player to try again
              console.log('Invalid card selection. Try again.');
              takeInput();
          } else {
              console.log('Current live stack:', livestack);
              turnChange(); // Move to the next player's turn
              takeInput(); // Prompt the next player for input
          }
      }
  });
}*/

function playCard(playerHand, playedCard, livestack) {
  const cardIndex = playerHand.indexOf(playedCard);
  if (cardIndex === -1) {
      console.log('Invalid card selection. Try again.');
      return false; // Card was not played successfully
  }

  if (livestack.length === 0) {
      // If livestack is empty, push the played card onto it
      livestack.push(playedCard);
  } else {
      if (!checkCard(livestack, playedCard)) {
          console.log('Cannot play card. Try a different card or draw.');
          return false; // Card was not played successfully
      }

      livestack.unshift(playedCard); // Put the played card on top of the live stack
  }

  // Remove the played card from the player's hand
  playerHand.splice(cardIndex, 1);

  console.log('Card played successfully.');
  console.log('Your current hand: ' + playerHands[turn - 1].join(', '));
  console.log('livestack', livestack);

  return true; // Card was played successfully
}






function takeInput() {
  console.log('Your current hand: ' + playerHands[turn - 1].join(', '));
  readline.question('Player ' + turn + ', choose a card to play (or type "draw" to draw a card, or "pass turn"): ', cardChoice => {
      cardChoice = cardChoice.trim().toLowerCase();
      if (cardChoice === 'draw') {
          draw(turn);
          console.log('Current live stack:', livestack);
          turnChange(); // Move to the next player's turn
          takeInput(); // Prompt the next player for input
      } else if (cardChoice === 'pass turn') {
          console.log('Player ' + turn + ' passes their turn.');
          turnChange(); // Move to the next player's turn
          takeInput(); // Prompt the next player for input
      } else {
          const cardsToPlay = cardChoice.split(',').map(c => c.trim());
          let allPlayedSuccessfully = true;
          for (const card of cardsToPlay) {
              const cardPlayedSuccessfully = playCard(playerHands[turn - 1], card, livestack);
              if (!cardPlayedSuccessfully) {
                  allPlayedSuccessfully = false;
                  break;
              }
          }
          if (!allPlayedSuccessfully) {
              // If any card couldn't be played, prompt the same player to try again
              console.log('Invalid card selection. Try again.');
              takeInput();
          } else {
              console.log('Current live stack:', livestack);
              takeInput(); // Prompt the same player for input again
          }
      }
  });
}



































/*
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
*/
function checkCard(livestack, card) {
  const cardColor = card[card.length - 1]; // Extract card color
  const cardValue = card.substring(0, card.length - 1); // Extract card value

  // Check if the card is a special card
  if (cardValue === 'S' || cardValue === 'D' || cardValue === 'R' || cardValue === 'W' || cardValue === 'Q') {
      // Handle special cards based on type
      switch (cardValue) {
        case 'S': // Q
        // 'Q' card can only be played if it matches the color of the top card in the live stack
        return livestack.length === 0 || livestack[0]?.endsWith(cardColor);
    
          case 'W': // Q
          // 'Q' card can only be played if it matches the color of the top card in the live stack
          return livestack.length === 0 || livestack[0]?.endsWith(cardColor);
      
          case 'R': // Q
    // 'Q' card can only be played if it matches the color of the top card in the live stack
    return livestack.length === 0 || livestack[0]?.endsWith(cardColor);

          case 'Q': // Q
          // 'Q' card can only be played if it matches the color of the top card in the live stack
          return livestack.length === 0 || livestack[0]?.endsWith(cardColor);
      
          case 'D': // Draw Two
              // Draw Two can be played on any color, but ideally matching the last card's color if possible
              return livestack.length === 0 || livestack[0]?.endsWith(cardColor); // Check if the color of the top card matches the color of the special card
          default:
              // This shouldn't happen, but handle unexpected card value
              console.error("Invalid special card value:", cardValue);
              return false;
      }
  } else {
      // Check if the card matches the color or value of the top card in the livestack
      if (livestack.length === 0) {
          // Livestack is empty, any card can be played except Skip
          return cardValue !== 'S';
      }
      const lastCard = livestack[0];
      const lastCardColor = lastCard[lastCard.length - 1]; // Extract last card color
      const lastCardValue = lastCard.substring(0, lastCard.length - 1); // Extract last card value

      // Check for valid card based on color or value match
      return lastCardColor === cardColor || lastCardValue === cardValue;
  }
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
