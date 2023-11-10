let gameWords = document.querySelectorAll(".game-block");
let modal = document.querySelector(".modal");
let restartButton = document.querySelector(".modal-button");
let gameContainer = document.querySelector(".game-container");

let gameWord = "O";
let gameOver = false;
let fillIndex = [];

function checkGameOver(gameWords) {
     let checkArray = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
     ];

     for (let i = 0; i < checkArray.length; i++) {
          if (
               gameWords[checkArray[i][0]].getAttribute("data-game") ===
                    gameWords[checkArray[i][1]].getAttribute("data-game") &&
               gameWords[checkArray[i][1]].getAttribute("data-game") ===
                    gameWords[checkArray[i][2]].getAttribute("data-game") &&
               gameWords[checkArray[i][0]].getAttribute("data-game") !==
                    "none" &&
               gameWords[checkArray[i][1]].getAttribute("data-game") !==
                    "none" &&
               gameWords[checkArray[i][2]].getAttribute("data-game") !== "none"
          ) {
               gameOver = true;
               fillIndex = checkArray[i];
          }
     }
}

function fill(fillIndex) {
     for (let i = 0; i < fillIndex.length; i++) {
          gameWords[fillIndex[i]].style.backgroundColor = "rgb(223, 223, 223)";
     }
}

function endGame() {
     fill(fillIndex);
     modal.style.display = "flex";
     gameContainer.disabled = true;
}

for (let i = 0; i < gameWords.length; i++) {
     gameWords[i].addEventListener("click", (e) => {
          const dataGameValue = e.target.getAttribute("data-game");
          if (dataGameValue === "none" && !gameOver) {
               e.target.setAttribute("data-game", gameWord);
               e.target.textContent = gameWord;
               checkGameOver(gameWords);
               if (gameOver) {
                    endGame();
               }

               gameWord = gameWord === "O" ? "X" : "O";
          }
     });
}
restartButton.addEventListener("click", () => {
     location.reload();
});
