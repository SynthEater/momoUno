// je check le livestack 0 car je vais toujours comparer avec la premiere carte
 
function colorchange() {
    if (playedCard === 'Sv' || playedCard === 'Sr' || playedCard === 'Sb' || playedCard === 'SJ') {
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
 
 
 
  // Function to update turn based on direction and skipping
function turnChange() {
    if (!clockwise) {
      turn--;
    } else {
      turn++;
    }
  
    // Handle turn wrap-around
    if (turn === 0) {
      turn = 4;
    } else if (turn === 5) {
      turn = 1;
    }
  
    // Apply draw flag from card effects
    if (drawFlag > 0) {
      for (let i = 0; i < drawFlag; i++) {
        draw(turn);
      }
      drawFlag = 0;
    }
  
    console.log(`Current player: ${turn}`);
  }
  
  // Function to draw a card for a player
  function draw(pl) {
    switch (pl) {
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
        }}