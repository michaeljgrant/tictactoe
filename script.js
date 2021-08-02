const player1 = "X";
const player2 = "O";
let currentPlayer = player1;
let text = document.getElementById("textBox");
const gameboard = ["", "", "", "", "", "", "", "", ""];
const restartBtn = document.getElementById("restart");

const physicalBoard = document.querySelectorAll(".gameboard");
const testPhys = document.querySelectorAll(".spaceOnBoard");
const spaceSelected = (event) => {
    let selectedIndex = event.target.dataset.index;
    console.log("Space has been selected");
    event.target.innerText = currentPlayer;
    gameboard[selectedIndex] = event.target.innerText;
    if (playerWon()) {
        text.innerText = `${currentPlayer} has won!`;
        restart();
        return;
      }
  
      if (playerDraw()) {
        return;
      }
      currentPlayer = currentPlayer === player2 ? player1 : player2;
    }

for (space of physicalBoard) {
    space.addEventListener('click', spaceSelected);
}



const playerWon = () => {
    if (gameboard[0] === currentPlayer) {
      if (gameboard[1] === currentPlayer && gameboard[2] === currentPlayer) {
        return true;
      }
      if (gameboard[3] === currentPlayer && gameboard[6] === currentPlayer) {
        return true;
      }
      if (gameboard[4] === currentPlayer && gameboard[8] === currentPlayer) {
        return true;
      }
    }
    if (gameboard[8] === currentPlayer) {
      if (gameboard[2] === currentPlayer && gameboard[5] === currentPlayer) {
        return true;
      }
      if (gameboard[6] === currentPlayer && gameboard[7] === currentPlayer) {
        return true;
      }
    }
    if (gameboard[4] === currentPlayer) {
      if (gameboard[1] === currentPlayer && gameboard[7] === currentPlayer) {
        return true;
      }
      if (gameboard[3] === currentPlayer && gameboard[5] === currentPlayer) {
        return true;
      }
      if (gameboard[2] === currentPlayer && gameboard[6] === currentPlayer) {
        return true;
      }
    }
  };

const playerDraw = () => {
    let draw = 0;
    gameboard.forEach((space, i) => {
      if (gameboard[i] !== "") draw++;
    });
    if (draw === 9) {
      text.innerText = `Draw`;
      restart();
    }
  };


const restart = () => {
    setTimeout(() => {
     for (arraySpace of gameboard) {
         arraySpace = "";
     }
      for (spaces of testPhys){
          spaces.innerText = "";
      }

    }, 3000);
  };

restartBtn.addEventListener('click', restart);


// function passes indexes and compares if they match to declare win or not
//  



// try currentPlayer = "";
// have function that excecutes inserting based on currentPlayer
// spaceSelect "if currentPlayer = x" execute X block else execute O block then
//togglePlayer()
// function to toggle currentPlayer executed at end of turn function
// eg togglePlayer > if currentPlayer = playerX currentPlayer = playerO