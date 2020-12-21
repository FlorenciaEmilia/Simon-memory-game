const gameButtons = document.querySelectorAll(".game-button");
const gameStarter = document.getElementById("game-starter");

//colors for the squares
const simonColors = {
  0: "yellow",
  1: "blue",
  2: "red",
  3: "green",
};
//iterations in the game
let amountOfIterations = 3;

let pcTurnStack = [];
let userTurnStack = [];

function squarePicker() {
  return Math.floor(Math.random() * gameButtons.length);
}

function removeEventListeners(array) {
  for (let elem of array) {
    elem.removeEventListener("click", userPick);
  }
}

function addEventListeners(array) {
  //Pass the index to be able to push it into the user stack
  array.forEach((elem, index) => {
    elem.addEventListener("click", () => {
      userPick(index);
      if (
        pcTurnStack[amountOfIterations - 1] !==
        userTurnStack[amountOfIterations - 1]
      ) {
        alert("Game over");
      } else {
        gamePlay();
      }
    });
  });
}

function userPick(index) {
  userTurnStack.push(index);
  console.log(userTurnStack);
}

function colorChange(elementIndex) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      gameButtons[elementIndex].style.backgroundColor =
        simonColors[elementIndex];
      resolve();
    }, 500);
    //Be aware of bugs here
    setTimeout(() => {
      gameButtons[elementIndex].style.backgroundColor = "white";
    }, 1000);
  });
}

async function computerTurn() {
  //if there are any event listeners remove them
  removeEventListeners(gameButtons);

  for (let i = 0; i < pcTurnStack.length; i++) {
    await colorChange(pcTurnStack[i]);
  }

  //Once the start game light one of the game buttons
  let squareThatWillLightUp = squarePicker();

  await colorChange(squareThatWillLightUp);

  pcTurnStack.push(squareThatWillLightUp);
  console.log(pcTurnStack);
}

function gamePlay() {
  computerTurn();
}

gameStarter.addEventListener("click", () => {
  // console.log(squarePicker());
  gamePlay();
});

//Try just one time to play and then add turns and more iterations
