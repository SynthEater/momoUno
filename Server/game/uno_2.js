

// being able to take user input
const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  
  //STACK THAT WE DRAW FROM
  let stack = [
    '1v','2v','3v','4v','5v','6v','7v','8v','9v', 'Rv', 'Sv', 'Qv', 'Dv',
    '1b','2b','3b','4b','5b','6b','7b','8b','9b', 'Rb', 'Sb', 'Qb', 'Db',
    '1j','2j','3j','4j','5j','6j','7j','8j','9j', 'Rj', 'Sj', 'Qj', 'Dj',
    '1r','2r','3r','4r','5r','6r','7r','8r','9r', 'Rr', 'Sr', 'Qr', 'Dr'
  ];
  
  //arrays represent players hands
  let j1 = [];
  let j2 = [];
  let j3 = [];
  let j4 = [];
  
  //let pl1;
  let pl = 1;
  
  //
  
  
  let playerIP = [j1,j2,j3,j4];   //?
  
  //STACK THAT WE PLAY ON
  let livestack = [];

  // la main de chaque joueur
  playerHand= [];
  
  //Ajuster le nombre de carte distribuees au debut
  let NBCARDSSTART = 7;
  
  let playedCard = '2j';
  
  let turn = 1;
  
  let activePlayer = turn;
  
  let indexToChop = -1;
  
  let clockwise = true;
  
  let data;
  /*
  function printStack(){
    console.log('stack: ' + stack);
  }*/
  /*
  
  function ipToPl(){
  
  }
  
  //Print la derniere carte mise sur livestack (jouee)
  function printLiveStack(){
    console.log('live card: ' + livestack[0]);
  }*/
  
  //pass player number to print his hand
  function printHand(pl){
    switch (pl){
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
  
  //takes a random card from stack and puts it in liveStack
  function turn1stCard(){
    let firstCard = stack.splice(getRandomInt(stack.length), 1);
    livestack.push(firstCard);
  }
  
  function distribute(){
    //j1
    for(let i = 0; i < NBCARDSSTART; i++){
        j1.push(stack.splice(getRandomInt(stack.length), 1));
    }
    //j2
    for(let i = 0; i < NBCARDSSTART; i++){
        j2.push(stack.splice(getRandomInt(stack.length), 1));
    }
    //j3
    for(let i = 0; i < NBCARDSSTART; i++){
        j3.push(stack.splice(getRandomInt(stack.length), 1));
    }
    //j4
    for(let i = 0; i < NBCARDSSTART; i++){
        j4.push(stack.splice(getRandomInt(stack.length), 1));
    }
  }
  
  
  
  
  
  //faire piger un joueur
  function draw(pl){
    switch (pl){
        case 1:
            j1.push(stack.splice(getRandomInt(stack.length), 1));
            break;
        case 2:
            j2.push(stack.splice(getRandomInt(stack.length), 1));
            break;
        case 3:
            j3.push(stack.splice(getRandomInt(stack.length), 1));
            break;
        case 4:
            j4.push(stack.splice(getRandomInt(stack.length), 1));
            break;
        default:
            console.log('enter j1, j2, j3, j4');
    }
  }
  
 

  
  function takeInput() {
    // Prompt player for action
    readline.question('Player ' + turn + ', choose a card to play (or type "draw" to draw a card): ', cardChoice => {
        // Handle player action
        if (cardChoice.toLowerCase() === 'draw') {
            draw(turn); // Draw a card
        } else {
            playedCard = cardChoice.trim().toLowerCase();
            playCard(turn); // Play the selected card
        }
        readline.close();
    });
}




/*
function checkIndexNumber(joueur) {
  for (let i = 0; i < joueur.length; i++) {
      if (playedCard === joueur[i]) {
          indexToChop = i;
          return true;
      }
  }
  console.log('vous ne possedez pas cette carte');
  return false; // Return false if card is not found
}
*/

function checkIndexNumber(playerHand) {
  indexToChop = playerHand.indexOf(playedCard);
  if (indexToChop === -1) {
      console.log('You do not have this card.');
      return false;
  }
  return true;
}
  

  
  function turnOrder(){
  
    if(playedCard[0] == 'R'){
        clockwise = !clockwise;
    }
  
    if(playedCard[0] == 'S'){
        skipTurn();
    }
  
    if(playedCard[0] == 'D'){
        draw(turn);
        draw(turn);
    }
    if(playedCard[0] == 'Q'){
        draw(turn);
        draw(turn);
        draw(turn);
        draw(turn);
    }
  }

/*
  function turnChange() {
    if (clockwise) {
        turn = (turn % 4) + 1; // Move to the next player
    } else {
        turn = (turn === 1) ? 4 : turn - 1; // Move to the previous player
    }
    // Handle skipping turns for special cards
    if (playedCard[0] === 'S') {
        if (clockwise) {
            turn = (turn % 4) + 1;
        } else {
            turn = (turn === 1) ? 4 : turn - 1;
        }
    }
}
*/


  
  function skipTurn(){
    if(!clockwise){
        turn -2;
    }else
        turn +2;
  }
  /*
  function playCard() {
    if (checkIndexNumber(playerIP[turn])) { // Pass player's hand as an argument
        if (checkCard(livestack[0], playedCard)) {
            livestack.push(playerIP[turn].splice(indexToChop, 1)); // Pass player's hand as an argument
            console.log('la carte a ete jouee');
        }
    }
}*/

/*
  function playCard(playerHand, playedCard) {
    // Check if card exists in hand and is a valid play
    const cardIndex = playerHand.indexOf(playedCard);
    if (cardIndex === -1 || !checkCard(livestack[0], playedCard)) {
      console.log('Invalid card selection. Try again.');
      return;
    }
  const lastCard = livestack[0];
  if (!checkCard(lastCard, playedCard)) {
      console.log('Cannot play card. Try a different card or draw.');
      return;
  }

  livestack.unshift(playerHand.splice(indexToChop, 1)[0]); // Put the played card on top of the live stack
  console.log('Card played successfully.');
}
*/
  
  
  



  function checkCard(lastCard, card) {
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
/*
function checkCard(lastCard,card) {
  const lastCardColor = lastCard[lastCard.length - 1]; // Extract last card color
  const cardColor = card[card.length - 1]; // Extract card color
  const lastCardValue = lastCard.slice(0, lastCard.length - 1); // Extract last card value
  const cardValue = card.slice(0, card.length - 1); // Extract card value

  // Check if the card matches the color or value of the last card
  return (lastCardColor === cardColor || lastCardValue === cardValue);
}*/




  
  
    
  // je check le livestack 0 car je vais toujours comparer avec la premiere carte 
  /*
  function colorchange() {
    if (playedCard === 'Qv' || playedCard === 'Qr' || playedCard === 'Qb' || playedCard === 'QJ') {
      // Wild card played, prompt client for new color
      sendToClient(clientSocket, 'Wild card played! Choose a new color (r, b, g, or y): ');
  
      clientSocket.on('data', (receivedData) => {
        data = receivedData.toString().trim(); // Extract and trim received data
        if (data === 'r' || data === 'b' || data === 'j' || data === 'v') {
          livestack.push(playedCard + data); // Add Wild card with chosen color to livestack
          sendToClient(clientSocket, `New color set to ${data}`); // Inform other players
        } else {
          sendToClient(clientSocket, 'Invalid color. Please choose r, b, g, or y.');
        }
      });
    }
    
    else {
      // Not a Wild card, standard color comparison
      if (checkCard(livestack[0], playedCard)) {
        livestack.push(playerHand[turn].splice(indexToChop, 1));
        console.log('Card played!');
        sendToClient(clientSocket, `Player ${turn} played ${playedCard}`); // Inform other players
      } else {
        console.log('Cannot play card. Try a different card or draw.');
        sendToClient(clientSocket, `Player ${turn} cannot play ${playedCard}`); // Inform other players
      }
    }
  }*/
  
   

  
  // Handle a player's turn
  function game(pl) {
   
  
    // Prompt for card selection (consider implementing a visual interface later)
    switch (pl) {
        case 1:
          playerHand = j1;
          break;
      case 2:
          playerHand = j2;
          break;
      case 3:
          playerHand = j3;
          break;
      case 4:
          playerHand = j4;
          break;
      default:
         
          break;
  }
  distribute();
  turn1stCard();

  printHand(pl);

    readline.question('Player ' + turn + ' choose a card (or "draw"): ', cardChoice => {
      playedCard = cardChoice.trim().toLowerCase();
       
      playCard(playerHand, playedCard);

      takeInput();

      //checkCard(livestack[0], playedCard);

      // Handle draw command
       if (playedCard === 'draw') {
        draw(pl);
    } else
    
    { 
        
      //colorchange();

      skipTurn();
      turnChange(); 
      turnOrder();
      

    }
    });
  }

function playCard(playerHand, playedCard) {
  const cardIndex = playerHand.indexOf(playedCard);
  if (cardIndex === -1) {
      console.log('Invalid card selection. Try again.');
      return;
  }

  const lastCard = livestack[0];
  if (!checkCard(lastCard, playedCard)) {
      console.log('Cannot play card. Try a different card or draw.');
      return;
  }

  livestack.unshift(playerHand.splice(cardIndex, 1)[0]); // Remove card from player's hand and put it on top of the live stack
  console.log('Card played successfully.');
}


function turnChange() {
  if (clockwise) {
      turn = (turn % 4) + 1; // Move to the next player
  } else {
      turn = (turn === 1) ? 4 : turn - 1; // Move to the previous player
  }
  // Handle skipping turns for special cards
  if (playedCard[0] === 'S') {
      if (clockwise) {
          turn = (turn % 4) + 1;
      } else {
          turn = (turn === 1) ? 4 : turn - 1;
      }
  }
}

  
  function checkWinCondition() {
    // Check each player's hand for emptiness
    if (j1.length === 0) {
        console.log("Player 1 wins!");
       
        return true;
    } else if (j2.length === 0) {
        console.log("Player 2 wins!");
        return true;
    } else if (j3.length === 0) {
        console.log("Player 3 wins!");
        return true;
    } else if (j4.length === 0) {
        console.log("Player 4 wins!");
        return true;
    }
    return false; // No winner yet
}


game(pl);
 



 /*


  

  
  //AFFAIRE QUE CHAT A DIT DE CHANGER

function takeInput() {
    // Prompt player for action
    readline.question('Player ' + turn + ', choose a card to play (or type "draw" to draw a card): ', cardChoice => {
        // Handle player action
        if (cardChoice.toLowerCase() === 'draw') {
            draw(turn); // Draw a card
        } else {
            playedCard = cardChoice.trim().toLowerCase();
            playCard(turn); // Play the selected card
        }
        readline.close();
    });
}




function turnChange() {
    if (clockwise) {
        turn = (turn % 4) + 1; // Move to the next player
    } else {
        turn = (turn === 1) ? 4 : turn - 1; // Move to the previous player
    }
    // Handle skipping turns for special cards
    if (playedCard[0] === 'S') {
        if (clockwise) {
            turn = (turn % 4) + 1;
        } else {
            turn = (turn === 1) ? 4 : turn - 1;
        }
    }
}









function checkCard(lastCard, card) {
    const lastCardColor = lastCard[lastCard.length - 1]; // Extract last card color
    const cardColor = card[card.length - 1]; // Extract card color
    const lastCardValue = lastCard.substring(0, lastCard.length - 1); // Extract last card value
    const cardValue = card.substring(0, card.length - 1); // Extract card value

    // Check if the card matches the color or value of the last card
    return (lastCardColor === cardColor || lastCardValue === cardValue);
}  */



/*

VIEUX fonctions



  function checkCard(lastCard, Card){
    if(lastCard[0] == Card[0] || 
       lastCard[1] == Card[1] ){
        console.log('Can play card');
        return true;
       } else {
        console.log('Cannot play card');
        return false;
    }
  }
  


   function turnChange(){
    if(!clockwise)
        turn--;
    if(turn == 0){
        turn = 4;
        }
     else{
        turn++;
        if(turn == 5){
            turn = 1;
        }
    }
    console.log(turn);
  
  }



 function takeInput(){
    //demande jouer entrer carte
    readline.question('joueur ' + turn + ' jouez carte: \n', carte => {
        playedCard = carte;
        readline.close();
    });
  }
  





*/

// mettre variable pour etre dynamic? 9v remplacer par lastCard et 3b remplacer par Card
  //checkCard('9v','3b');
  
  
 /* function checkCard(lastCard, card) {
    const lastCardColor = lastCard[lastCard.length - 1]; // Extract last card color
    const cardColor = card[card.length - 1]; // Extract card color
    const lastCardValue = lastCard.substring(0, lastCard.length - 1); // Extract last card value
    const cardValue = card.substring(0, card.length - 1); // Extract card value

    // Check if the card matches the color or value of the last card
    return (lastCardColor === cardColor || lastCardValue === cardValue);
  }*/
