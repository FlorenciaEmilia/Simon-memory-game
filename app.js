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
let amountOfIterations = 1;
let pcTurn = [];
let userTurn = [];

function squarePicker() {
  return Math.floor(Math.random() * gameButtons.length);
}

function gamePlay() {
  //Once the start game light one of the game buttons
  let squareThatWillLightUp = squarePicker();
  //Set a time out here in the future
  document.gameButtons[squareThatWillLightUp].style.backgroundColor =
    simonColors[squareThatWillLightUp];
}

gameStarter.addEventListener("click", () => {
  // console.log(squarePicker());
  gamePlay();
});

//Try just one time to play and then add turns and more iterations
