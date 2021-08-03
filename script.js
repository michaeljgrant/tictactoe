const player1 = "X";
const player2 = "O";
let currentPlayer = player1;
let text = document.getElementById("textBox");
const gameboard = ["", "", "", "", "", "", "", "", ""];
const restartBtn = document.getElementById("restart");
const warningText = document.getElementById("warning");
const physicalBoard = document.querySelectorAll(".gameboard");
const boardSpaces = document.querySelectorAll(".spaceOnBoard");


const spaceSelected = (event) => {
    let selectedIndex = event.target.dataset.index;
    if (event.target.innerText){
      warningText.innerText = "That space is already selected";
      setTimeout(()=>{
        warningText.innerText = "";
      }, 1500);
      return;
    }
    event.target.innerText = currentPlayer;
    gameboard[selectedIndex] = event.target.innerText;
    if (playerWon()) {
        text.innerText = `${currentPlayer} has won!`;
        endOfRound();
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

const scoreboardX = document.getElementById("playerX");
const scoreboardO = document.getElementById("playerO");


const playerWon = () => {
    if (gameboard[0] === currentPlayer) {
      if (gameboard[1] === currentPlayer && gameboard[2] === currentPlayer) {
        if(currentPlayer === player1){
          scoreboardX.innerText ++;
        } else {
          scoreboardO.innerText ++;
        }
        return true;
      }
      if (gameboard[3] === currentPlayer && gameboard[6] === currentPlayer) {
        if(currentPlayer === player1){
          scoreboardX.innerText ++;
        } else {
          scoreboardO.innerText ++;
        }
        return true;
      }
      if (gameboard[4] === currentPlayer && gameboard[8] === currentPlayer) {
        if(currentPlayer === player1){
          scoreboardX.innerText ++;
        } else {
          scoreboardO.innerText ++;
        }
        return true;
      }
    }
    if (gameboard[8] === currentPlayer) {
      if (gameboard[2] === currentPlayer && gameboard[5] === currentPlayer) {
        if(currentPlayer === player1){
          scoreboardX.innerText ++;
        } else {
          scoreboardO.innerText ++;
        }
        return true;
      }
      if (gameboard[6] === currentPlayer && gameboard[7] === currentPlayer) {
        if(currentPlayer === player1){
          scoreboardX.innerText ++;
        } else {
          scoreboardO.innerText ++;
        }
        return true;
      }
    }
    if (gameboard[4] === currentPlayer) {
      if (gameboard[1] === currentPlayer && gameboard[7] === currentPlayer) {
        if(currentPlayer === player1){
          scoreboardX.innerText ++;
        } else {
          scoreboardO.innerText ++;
        }
        return true;
      }
      if (gameboard[3] === currentPlayer && gameboard[5] === currentPlayer) {
        if(currentPlayer === player1){
          scoreboardX.innerText ++;
        } else {
          scoreboardO.innerText ++;
        }
        return true;
      }
      if (gameboard[2] === currentPlayer && gameboard[6] === currentPlayer) {
        if(currentPlayer === player1){
          scoreboardX.innerText ++;
        } else {
          scoreboardO.innerText ++;
        }
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
 
const endOfRound = () => {
  setTimeout(() => {
    gameboard.forEach((space, i) => {
      gameboard[i] = "";
    });
    for (spaces of boardSpaces){
        spaces.innerText = "";
    }
    text.innerText = "";
    currentPlayer = currentPlayer === player2 ? player1 : player2;
      }, 1500);
}


const restart = () => {
  
      gameboard.forEach((space, i) => {
        gameboard[i] = "";
      });
      for (spaces of boardSpaces){
          spaces.innerText = "";
      }
      text.innerText = "";
      currentPlayer = currentPlayer === player2 ? player1 : player2;
      scoreboardO.innerText = "0";
      scoreboardX.innerText = "0";
    }

restartBtn.addEventListener('click', restart);