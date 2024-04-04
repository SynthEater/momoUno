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
  
  let pl1;
  
  //
  
  
  let playerIP = [j1,j2,,150];   //?
  
  //STACK THAT WE PLAY ON
  let livestack = [];
  
  //Ajuster le nombre de carte distribuees au debut
  let NBCARDSSTART = 7;
  
  let playedCard = '2j';
  
  let turn = 1;
  
  let activePlayer = turn;
  
  let indexToChop;
  
  let clockwise = true;
  
  let data;
  
  function printStack(){
    console.log('stack: ' + stack);
  }
  
  function ipToPl(){
  
  }
  
  //Print la derniere carte mise sur livestack (jouee)
  function printLiveStack(){
    console.log('live card: ' + livestack[0]);
  }
  
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
  
  
  /*  Remplacer par main loop()?
  function startGame(){
    turn1stCard();
    startDraw();
  }
  */
  
  
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
  
  function takeInput(){
    //demande jouer entrer carte
    readline.question('joueur ' + turn + ' jouez carte: \n', carte => {
        playedCard = carte;
        readline.close();
    });
  }
  
  function checkIndexNumber(joueur){
  
    for(let i = 0; i < joueur.length; i++){
        if(playedCard == joueur[i]){
            indexToChop = i;
            return true;
        }else{
            console.log('vous ne possedez pas cette carte');
        }
    }
  }
  
  /*
  function game(pl){
  
  
  
    printHand(pl);
    takeInput();
    console.log(playedCard);
    console.log(checkCardinHand);
  }
  */
  
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
  
  function skipTurn(){
    if(!clockwise){
        turn -2;
    }else
        turn +2;
  }
  
  function playCard(){
     if(checkIndexNumber(pl)){
  
        if(checkPlayedCard(livestack[0], playedCard)){
            livestack.push(pl.splice(indexToChop, 1));
            console.log('la carte a ete jouee');
  
        }
    }
  }
  
  
  
  // mettre variable pour etre dynamic? 9v remplacer par lastCard et 3b remplacer par Card
  //checkCard('9v','3b');
  
  
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
  
  
    
  // je check le livestack 0 car je vais toujours comparer avec la premiere carte 
  
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
    } else {
      // Not a Wild card, standard color comparison
      if (checkPlayedCard(livestack[0], playedCard)) {
        livestack.push(playerHands[turn].splice(indexToChop, 1));
        console.log('Card played!');
        sendToClient(clientSocket, `Player ${turn} played ${playedCard}`); // Inform other players
      } else {
        console.log('Cannot play card. Try a different card or draw.');
        sendToClient(clientSocket, `Player ${turn} cannot play ${playedCard}`); // Inform other players
      }
    }
  }
  
     // Ou le code va s'executer jusqua la fin du jeu
  function mainLoop() {
    while (true) {
      // Check for win condition (empty hand)
      if (playerHands[turn].length === 0) {
        console.log(`Player ${turn} wins!`);
        break;
      }
  
      // Check if deck is empty (need to shuffle back in played cards)
      if (stack.length === 0) {
        console.log('Reshuffling deck...');
        // Implement logic to shuffle livestack back into stack (not shown here)
        stack = [...livestack]; // Temporary placeholder for reshuffling
        livestack = [];
      }

      if (checkWinCondition()) {
        break; // Exit the game loop if a player has won
    }
  
      // Handle player turn
      game(turn);
  
      // Update turn based on direction and skipping
      turnChange();
    }
  }

  
  // Handle a player's turn
  function game(pl) {
    // Print player's hand
    printHand(pl);
  
    // Prompt for card selection (consider implementing a visual interface later)
    readline.question('Player ' + turn + ' choose a card (or "draw"): ', cardChoice => {
      playedCard = cardChoice.trim().toLowerCase();
  
      // Handle draw command
      if (playedCard === 'draw') {
        draw(pl);
      } else {
        // Validate and play selected card
        if (checkIndexNumber(pl) && checkPlayedCard(livestack[0], playedCard)) {
          playCard(pl);
        } else {
          console.log('Invalid card selection. Try again.');
        }
      }
  
      readline.close();
    });
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

 

  distribute();
  printHand(j1);

  /*
  AFFAIRE QUE CHAT A DIT DE CHANGER

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
}






















  
  
  
  */ 