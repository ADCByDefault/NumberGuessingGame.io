const istruzioni = document.querySelector("#istruzioni");
const freccia = document.querySelector("#arrow");
const testoIstruzioni = document.querySelector("#testoIstruzioni");
const reset = document.querySelector("#reButton");
const numberInput = document.querySelector("#numberInput");
const checkButton = document.querySelector("#checkButton");
const gameBoard = document.querySelector("#gameBoard");
const gameStatusIcon = document.querySelector("#gameStatusIcon");
const gameStatusText = document.querySelector("#gameStatusText");
const attempts = document.querySelector("#attempts");
const hints = document.querySelector("#hints");
const numbers = document.querySelector("#numbers");

let numberGen;
let nattempts;
let nhints;
let nnumbers = [];

istruzioni.addEventListener("click", () => {
	testoIstruzioni.classList.toggle("nascosto");
	testoIstruzioni.classList.toggle("visibile");
	freccia.classList.toggle("nascosto");
	freccia.classList.toggle("visibile");
});

window.addEventListener("load", () => {
	startGame();
});

reset.addEventListener("click", startGame);

function startGame() {
	numberGen = Math.floor(Math.random() * 100);
	console.log(numberGen);
	nattempts = 7;
	nhints = "...";
	nnumbers = [];
	clearBoard();
	aggiornaHelps();
	gameBoard.classList.remove("win");
	gameBoard.classList.remove("lose");
	checkButton.addEventListener("click", controllo);
	return;
}

function aggiornaHelps() {
	attempts.innerText = nattempts;
	hints.innerText = nhints;
	numbers.innerText = nnumbers.join("-");
	return;
}

function controllo() {
	if (numberInput.value == numberGen) {
		gameWin();
		return;
	}
	if (nattempts <= 0) {
		gameLose();
		return;
	}

	nattempts--;
	nnumbers.push(numberInput.value);

	if (numberInput.value > numberGen) {
		nhints = `${numberInput.value} > x`;
	}
	if (numberInput.value < numberGen) {
		nhints = `${numberInput.value} < x`;
	}

	aggiornaHelps();

	return;
}

function gameWin() {
	gameBoard.classList.add("win");
	gameStatusIcon.innerText = numberGen;
	gameStatusText.innerText = "Hai indovinato!";
	checkButton.removeEventListener("click", controllo);
	return;
}

function gameLose() {
	gameBoard.classList.add("lose");
	gameStatusIcon.innerText = numberGen;
	gameStatusText.innerText = "Hai perso!";
	checkButton.removeEventListener("click", controllo);
	return;
}

function clearBoard() {
	gameBoard.classList.remove("lose", "win");
	gameStatusIcon.innerHTML = `<span class="material-symbols-outlined"> not_listed_location </span>`;
	gameStatusText.innerText = "indovina";
	return;
}
