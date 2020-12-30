const gameButtons = document.querySelectorAll(".game-button");
const gameStarter = document.getElementById("game-starter");
const gameStrict = document.getElementById("game-strict");
const gameIterations = document.querySelector("#score");
const gameReset = document.getElementById("game-reset");

const gameInfo = document.getElementById("game-info");

//When the game starts the buttons are disabled
gameButtons.forEach((button) => (button.disabled = true));

//colors for the squares
const simonColors = {
  0: ["rgb(255, 255, 194)", "rgb(255, 255, 0)"],
  1: ["rgb(172, 172, 250)", " rgb(0, 0, 255)"],
  2: ["rgb(247, 163, 163)", "rgb(255, 0, 0)"],
  3: ["rgb(158, 255, 158)", "rgb(0, 255, 0)"],
};

//Data for each square
const simonData = {
  0: {
    lightColor: "rgb(255, 255, 194)",
    darkerColor: "rgb(255, 255, 0)",
    sound: "placeholder for now",
  },
  1: {
    lightColor: "rgb(172, 172, 250)",
    darkerColor: "rgb(0, 0, 255)",
    sound: "placeholder for now",
  },
  2: {
    lightColor: "rgb(247, 163, 163)",
    darkerColor: "rgb(255, 0, 0)",
    sound: "placeholder for now",
  },
  3: {
    lightColor: "rgb(158, 255, 158)",
    darkerColor: "rgb(0, 255, 0)",
    sound: "placeholder for now",
  },
};

let gameStrictToggle = false;
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
  //Make buttons be disabled while the color changes
  gameButtons.forEach((button) => (button.disabled = true));
  await colorChange(elementIndex, delay);
  await colorChangeWhite(elementIndex);
  //Once the promise has been fulfilled the buttons are back
  gameButtons.forEach((button) => (button.disabled = false));
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
  //Move the length of the stack once the user chooses the right square
  gameIterations.value = `${pcTurnStack.length}`;

  // userTurn();
  //The game will able the buttons that will let the user pick the pattern
  gameButtons.forEach((button) => (button.disabled = false));
  userTurnStack = [];

  console.log(pcTurnStack);
}

async function userPick(index) {
  gameInfo.innerHTML = "user turn";
  userTurnStack.push(index);
  await colorToggle(index, 0);

  let indexChecker = userTurnStack.length - 1;

  //Make 2 separate statements for either the game is strict or no
  if (pcTurnStack[indexChecker] !== userTurnStack[indexChecker]) {
    gameInfo.innerHTML = "wrong";
    userTurnStack = [];

    console.log("user stack ", userTurnStack);
    console.log("pc stack ", pcTurnStack);

    if (gameStrictToggle) {
      alert("wrong");
      gameStarter.disabled = false;
    } else {
      //Loop to show the pc Stack for user to memorize it
      for (let i = 0; i < pcTurnStack.length; i++) {
        await colorToggle(pcTurnStack[i]);
      }
    }
  } else if (pcTurnStack.length == userTurnStack.length) {
    computerTurn();
    gameButtons.forEach((button) => (button.disabled = true));
    console.log("now it will be the computer turn");
    gameInfo.innerHTML = "computer turn";
  }
}

function gamePlay() {
  computerTurn();
}

gameStarter.addEventListener("click", () => {
  // Once the game starts disable the start button!
  gamePlay();
  gameStarter.disabled = true;
});

//If the game is strict the user will loose if the guess is not right
gameStrict.addEventListener("click", () => {
  //change game strict variable to be set to the opposite
  gameStrictToggle = !gameStrictToggle;
});

//Reset Game
gameReset.addEventListener("click", () => {
  pcTurnStack = [];
  userTurnStack = [];
  gameIterations.value = "--";
  gameStarter.disabled = false;
});
//Modify the userTurn function
gameButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    userPick(index);
  });
});
