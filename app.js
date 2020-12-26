const gameButtons = document.querySelectorAll(".game-button");
const gameStarter = document.getElementById("game-starter");
const gameIterations = document.querySelector("#score");

//When the game starts the buttons are disabled
gameButtons.forEach((button) => (button.disabled = true));

//colors for the squares
const simonColors = {
  0: ["rgb(255, 255, 194)", "rgb(255, 255, 0)"],
  1: ["rgb(172, 172, 250)", " rgb(0, 0, 255)"],
  2: ["rgb(247, 163, 163)", "rgb(255, 0, 0)"],
  3: ["rgb(158, 255, 158)", "rgb(0, 255, 0)"],
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
        simonColors[elementIndex][0];
      resolve();
    }, delay);
  });
}

//Delete this function in the future to dry the code
function colorChangeWhite(elementIndex) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      gameButtons[elementIndex].style.backgroundColor =
        simonColors[elementIndex][1];
      resolve();
    }, 1000);
  });
}

async function colorToggle(elementIndex, delay = 500) {
  await colorChange(elementIndex, delay);
  await colorChangeWhite(elementIndex);
}

async function computerTurn() {
  //Loop to show the pc Stack for user to memorize it
  for (let i = 0; i < pcTurnStack.length; i++) {
    await colorToggle(pcTurnStack[i]);
  }

  //Once the game start light one of the game buttons
  let squareThatWillLightUp = squarePicker();
  await colorToggle(squareThatWillLightUp);
  pcTurnStack.push(squareThatWillLightUp);
  //Display the length of stack
  gameIterations.value = `${pcTurnStack.length}`;

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
    gameStarter.disabled = false;
    gameStarter.innerText = "Play Again🙇🏽‍♀️";
  } else if (pcTurnStack.length == userTurnStack.length) {
    computerTurn();
    gameButtons.forEach((button) => (button.disabled = true));
    console.log("now it will be the computer turn");
  }
}

async function userTurn(index) {
  // addEventListeners(gameButtons);
}

function gamePlay() {
  computerTurn();
}

gameStarter.addEventListener("click", () => {
  // Once the game starts disable the start button!
  gamePlay();
  gameStarter.disabled = true;
});

gameButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    userPick(index);
  });
});
