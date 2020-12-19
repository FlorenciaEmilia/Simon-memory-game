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

function squarePicker() {
  return Math.floor(Math.random() * gameButtons.length);
}

gameStarter.addEventListener("click", () => {
  console.log(squarePicker());
});
