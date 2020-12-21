const gameButtons = document.querySelectorAll(".game-button");
const gameStarter = document.getElementById("game-starter");
const turnInfo = document.getElementById("turn-info");

//When the game starts the buttons are disabled
gameButtons.forEach((button) => (button.disabled = true));

//colors for the squares
const simonColors = {
  0: "yellow",
  1: "blue",
  2: "red",
  3: "green",
};
//iterations in the game
let amountOfIterations = 0;

let pcTurnStack = [];
let userTurnStack = [];

function squarePicker() {
  return Math.floor(Math.random() * gameButtons.length);
}

//Color change functions
function colorChange(elementIndex, delay = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      gameButtons[elementIndex].style.backgroundColor =
        simonColors[elementIndex];
      resolve();
    }, delay);
  });
}

function colorChangeWhite(elementIndex) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      gameButtons[elementIndex].style.backgroundColor = "white";
      resolve();
    }, 1000);
  });
}

async function colorToggle(elementIndex, delay = 500) {
  await colorChange(elementIndex, delay);
  await colorChangeWhite(elementIndex);
}

async function computerTurn() {
  turnInfo.innerText = "PC turn";

  //Loop to show the pc Stack for user to memorize it
  for (let i = 0; i < pcTurnStack.length; i++) {
    await colorToggle(pcTurnStack[i]);
  }

  //Once the game start light one of the game buttons
  let squareThatWillLightUp = squarePicker();
  await colorToggle(squareThatWillLightUp);
  pcTurnStack.push(squareThatWillLightUp);

  userTurn();
  gameButtons.forEach((button) => (button.disabled = false));
  userTurnStack = [];

  console.log(pcTurnStack);
}

async function userPick(index) {
  userTurnStack.push(index);
  await colorToggle(index, 0);

  let indexChecker = userTurnStack.length - 1;

  if (pcTurnStack[indexChecker] !== userTurnStack[indexChecker]) {
    console.log("user stack ", userTurnStack);
    console.log("pc stack ", pcTurnStack);
    alert("wrong");
  } else if (pcTurnStack.length == userTurnStack.length) {
    computerTurn();
    gameButtons.forEach((button) => (button.disabled = true));
    console.log("now it will be the computer turn");
  }
}

async function userTurn(index) {
  // addEventListeners(gameButtons);
  turnInfo.innerText = "Your Turn 🐥";
}

function gamePlay() {
  computerTurn();
}

gameStarter.addEventListener("click", () => {
  // Once the game starts disable the start button!
  gamePlay();
});

gameButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    userPick(index);
  });
});
