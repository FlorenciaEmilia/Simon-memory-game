const gameButtons = document.querySelectorAll(".game-button");
const gameStarter = document.getElementById("game-starter");
const gameStrict = document.getElementById("game-strict");
const gameIterations = document.querySelector("#score");
const gameReset = document.getElementById("game-reset");
const gameStrictLight = document.querySelector(".strict-mode");
let timerColorUp;
let timerColorDown;

//When the game starts the buttons are disabled
gameButtons.forEach((button) => (button.disabled = true));

//Data for each square
const simonData = {
  0: {
    lightColor: "rgb(255, 255, 194)",
    darkerColor: "rgb(255, 255, 0)",
    sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  },
  1: {
    lightColor: "rgb(172, 172, 250)",
    darkerColor: "rgb(0, 0, 255)",
    sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  },
  2: {
    lightColor: "rgb(247, 163, 163)",
    darkerColor: "rgb(255, 0, 0)",
    sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  },
  3: {
    lightColor: "rgb(158, 255, 158)",
    darkerColor: "rgb(0, 255, 0)",
    sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
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
    timerColorUp = setTimeout(() => {
      gameButtons[elementIndex].style.backgroundColor =
        simonData[elementIndex].lightColor;
      gameButtons[
        elementIndex
      ].style.boxShadow = `3px 3px 20px ${simonData[elementIndex].lightColor}`;

      simonData[elementIndex].sound.play();

      resolve();
    }, delay);
  });
}

function colorChangeToNormal(elementIndex) {
  return new Promise((resolve, reject) => {
    timerColorDown = setTimeout(() => {
      gameButtons[elementIndex].style.backgroundColor =
        simonData[elementIndex].darkerColor;
      gameButtons[elementIndex].style.boxShadow = `none`;
      resolve();
    }, 1000);
  });
}

async function colorToggle(elementIndex, delay = 500) {
  //Make buttons be disabled while the color changes
  gameButtons.forEach((button) => (button.disabled = true));
  await colorChange(elementIndex, delay);
  await colorChangeToNormal(elementIndex);
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

  //The game will able the buttons that will let the user pick the pattern
  gameButtons.forEach((button) => (button.disabled = false));
  userTurnStack = [];
}

async function userPick(index) {
  userTurnStack.push(index);
  await colorToggle(index, 0);

  let indexChecker = userTurnStack.length - 1;

  if (pcTurnStack[indexChecker] !== userTurnStack[indexChecker]) {
    userTurnStack = [];
    const errorNoise = new Audio(
      "https://www.soundjay.com/button/sounds/beep-10.mp3"
    );
    errorNoise.volume = 0.4;
    errorNoise.play();
    if (gameStrictToggle) {
      gameStarter.disabled = false;
      gameIterations.value = "X";
      gameButtons.forEach((button) => (button.disabled = true));
      setTimeout(() => {
        gameIterations.value = "--";
      }, 1000);
    } else {
      //Loop to show the pc Stack for user to memorize it
      for (let i = 0; i < pcTurnStack.length; i++) {
        await colorToggle(pcTurnStack[i]);
      }
    }
  } else if (pcTurnStack.length == userTurnStack.length) {
    //Move the length of the stack once the user chooses the right square
    gameIterations.value = `${pcTurnStack.length}`;
    setTimeout(() => {
      computerTurn();
    }, 700);

    gameButtons.forEach((button) => (button.disabled = true));
  }
}

gameStarter.addEventListener("click", () => {
  // Once the game starts disable the start button!
  computerTurn();
  gameStarter.disabled = true;
});

//If the user does not get it right the game is over
gameStrict.addEventListener("click", () => {
  //change game strict variable to be set to the opposite
  gameStrictToggle = !gameStrictToggle;
  gameStrictLight.classList.toggle("strict-mode-light");
});

//Reset Game
gameReset.addEventListener("click", () => {
  pcTurnStack = [];
  userTurnStack = [];
  gameIterations.value = "--";
  gameStarter.disabled = false;
  //cancel all timers out
  clearTimeout(timerColorUp);
  clearTimeout(timerColorDown);
});
//Modify the userTurn function
gameButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    userPick(index);
  });
});
