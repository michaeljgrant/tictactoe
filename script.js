// global variable declarations
const player1 = "X";
const player2 = "O";
let currentPlayer = player1;
const gameboard = ["", "", "", "", "", "", "", "", ""];
const restartBtn = document.getElementById("restart");
const warningText = document.getElementById("warning");
const physicalBoard = document.querySelectorAll(".gameboard");
const boardSpaces = document.querySelectorAll(".spaceOnBoard");
const scoreboardX = document.getElementById("playerX");
const scoreboardO = document.getElementById("playerO");
const twoPlayerBoard = document.getElementById("twoPlayer");
const vsComp = document.getElementById("vsComp");

// On page load display select a game mode
warningText.innerText = "Please select a game mode";

// listeners for gamemodes
vsComp.addEventListener('click', versusComp);
twoPlayerBoard.addEventListener('click', twoPlayer);



// // // // // // //
// TWO PLAYER CODE
// // // // // // 

function twoPlayer() {

  // current players turn displayed on start of game
  warningText.innerText = `It is ${currentPlayer}'s turn!`

  // remove listeners from buttons - only restart has click functionality
  vsComp.removeEventListener('click', versusComp);
  twoPlayerBoard.removeEventListener('click', twoPlayer);


  // function for box selected by players
  const spaceSelected = (event) => {
    let selectedIndex = event.target.dataset.index;
    if (event.target.innerText) {
      warningText.innerText = "That space is already selected";
      setTimeout(() => {
        warningText.innerText = "";
      }, 1500);
      return;
    }
    event.target.innerText = currentPlayer;
    gameboard[selectedIndex] = event.target.innerText;
    currentPlayer = currentPlayer === player2 ? player1 : player2;
    warningText.innerText = `It is ${currentPlayer}'s turn!`;
    // Does playerWon return as true?
    if (playerWon()) {
      warningText.innerText = `${currentPlayer} has won!`;
      endTwoPlayer();
      return;
    }
    // Does the function of playerDraw return as true?
    if (playerDraw()) {
      return;
    }
    // If breaks not hit, change player and declare whose turn it is



  }

  // Determine winner
  function playerWon() {
    if (gameboard[0] === currentPlayer) {
      if (gameboard[1] === currentPlayer && gameboard[2] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
      if (gameboard[3] === currentPlayer && gameboard[6] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
      if (gameboard[4] === currentPlayer && gameboard[8] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
    }
    if (gameboard[8] === currentPlayer) {
      if (gameboard[2] === currentPlayer && gameboard[5] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
      if (gameboard[6] === currentPlayer && gameboard[7] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
    }
    if (gameboard[4] === currentPlayer) {
      if (gameboard[1] === currentPlayer && gameboard[7] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
      if (gameboard[3] === currentPlayer && gameboard[5] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
      if (gameboard[2] === currentPlayer && gameboard[6] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
    }
  };

  function playerDraw() {
    let draw = 0;
    gameboard.forEach((space, i) => {
      if (gameboard[i] !== "") draw++;
    });
    if (draw === 9) {
      warningText.innerText = "";
      warningText.innerText = `It's a Draw!`;
      endTwoPlayer();
    }
  };

  function endTwoPlayer() {
    setTimeout(() => {
      gameboard.forEach((space, i) => {
        gameboard[i] = "";
      });
      for (spaces of boardSpaces) {
        spaces.innerText = "";
      }
      warningText.innerText = "";
      currentPlayer = currentPlayer === player2 ? player1 : player2;
      warningText.innerText = `It is ${currentPlayer}'s turn!`;
    }, 2500);
  }
  for (space of physicalBoard) {
    space.addEventListener('click', spaceSelected);
  }

  function restart() {
    warningText.innerText = "Please select a game mode";
    gameboard.forEach((space, i) => {
      gameboard[i] = "";
    });
    for (spaces of boardSpaces) {
      spaces.innerText = "";
    }
    currentPlayer = player1;
    scoreboardO.innerText = "0";
    scoreboardX.innerText = "0";
    space.removeEventListener('click', spaceSelected);
    twoPlayerBoard.addEventListener('click', twoPlayer);
    vsComp.addEventListener('click', versusComp);

  }

  restartBtn.addEventListener('click', restart);

};







// // // // // // // //
// VERSUS COMPUTER CODE
// // // // // // // //

function versusComp() {
  // removes event listeners from buttons except Reset
  twoPlayerBoard.removeEventListener('click', twoPlayer);
  vsComp.removeEventListener('click', versusComp);
  warningText.innerText = `It is ${currentPlayer}'s turn!`

  // Computer takes turn - isn't hard to beat
  // Random space is selected and if it isn't blank it runs the function again until it finds a blank space

  function compTurn() {
    let randomIndex = Math.floor(Math.random() * (boardSpaces.length) + 1);

    if (gameboard[randomIndex] === "") {
      gameboard[randomIndex] = currentPlayer;
      boardSpaces[randomIndex].innerText = currentPlayer;
      console.log(gameboard);
      if (vsCompPlayerWon()) {
        warningText.innerText = `${currentPlayer} has won!`;
        endOfRound();
        return;
      }
      if (vsCompplayerDraw()) {
        return;
      }
      currentPlayer = currentPlayer === player2 ? player1 : player2;
      warningText.innerText = `It is ${currentPlayer}'s turn!`;

    } else if (gameboard !== "") {
      if (vsCompPlayerWon()) {
        warningText.innerText = `${currentPlayer} has won!`;
        endOfRound();
        return;
      }
      if (vsCompplayerDraw()) {
        return;
      }
      compTurn()
    }


  }

  // event listener function for player choices
  const spaceSelected = (event) => {
    let selectedIndex = event.target.dataset.index;
    if (event.target.innerText) {
      warningText.innerText = "That space is already selected";
      setTimeout(() => {
        warningText.innerText = "";
      }, 1500);
      return;
    }
    event.target.innerText = currentPlayer;
    gameboard[selectedIndex] = event.target.innerText;
    if (vsCompPlayerWon()) {
      warningText.innerText = `${currentPlayer} has won!`;
      endOfRound();
      return;
    };

    if (vsCompplayerDraw()) {
      return;
    }
    currentPlayer = currentPlayer === player2 ? player1 : player2;
    warningText.innerText = `It is ${currentPlayer}'s turn!`;
    compTurn()


  };




  // determines winner 
  function vsCompPlayerWon() {
    if (gameboard[0] === currentPlayer) {
      if (gameboard[1] === currentPlayer && gameboard[2] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
      if (gameboard[3] === currentPlayer && gameboard[6] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
      if (gameboard[4] === currentPlayer && gameboard[8] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
    }
    if (gameboard[8] === currentPlayer) {
      if (gameboard[2] === currentPlayer && gameboard[5] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
      if (gameboard[6] === currentPlayer && gameboard[7] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
    }
    if (gameboard[4] === currentPlayer) {
      if (gameboard[1] === currentPlayer && gameboard[7] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
      if (gameboard[3] === currentPlayer && gameboard[5] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
      if (gameboard[2] === currentPlayer && gameboard[6] === currentPlayer) {
        if (currentPlayer === player1) {
          scoreboardX.innerText++;
        } else {
          scoreboardO.innerText++;
        }
        return true;
      }
    }
  };

  function vsCompplayerDraw() {
    let draw = 0;
    gameboard.forEach((space, i) => {
      if (gameboard[i] !== "") draw++;
    });
    if (draw === 9) {
      warningText.innerText = "";
      warningText.innerText = `It's a Draw!`;
      endOfRound();
    }
  };

  // For computer games player turn order doesn't rotate. Human always chooses first every round.
  function endOfRound() {
    setTimeout(() => {
      gameboard.forEach((space, i) => {
        gameboard[i] = "";
      });
      for (spaces of boardSpaces) {
        spaces.innerText = "";
      }
      currentPlayer = player1;
      warningText.innerText = `It is ${currentPlayer}'s turn!`;
    }, 2500);
  }
  for (space of physicalBoard) {
    space.addEventListener('click', spaceSelected);
  }

  function restart() {
    warningText.innerText = "Please select a game mode";
    gameboard.forEach((space, i) => {
      gameboard[i] = "";
    });
    for (spaces of boardSpaces) {
      spaces.innerText = "";
    }
    currentPlayer = player1;
    scoreboardO.innerText = "0";
    scoreboardX.innerText = "0";
    space.removeEventListener('click', spaceSelected);
    twoPlayerBoard.addEventListener('click', twoPlayer);
    vsComp.addEventListener('click', versusComp);

  }

  restartBtn.addEventListener('click', restart);

};