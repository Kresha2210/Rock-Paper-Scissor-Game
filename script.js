const choices = ["rock", "paper", "scissors"];
const icons = {
  rock: "✊",
  paper: "✋",
  scissors: "✌",
};

const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const userScoreEl = document.getElementById("userScore");
const computerScoreEl = document.getElementById("computerScore");
const tieScoreEl = document.getElementById("tieScore");
const userChoiceIconEl = document.getElementById("userChoiceIcon");
const computerChoiceIconEl = document.getElementById("computerChoiceIcon");
const userChoiceTextEl = document.getElementById("userChoiceText");
const computerChoiceTextEl = document.getElementById("computerChoiceText");
const resultTextEl = document.getElementById("resultText");
const detailTextEl = document.getElementById("detailText");
const userFighterEl = document.getElementById("userFighter");
const computerFighterEl = document.getElementById("computerFighter");
const resetBtn = document.getElementById("resetBtn");
const choiceButtons = document.querySelectorAll(".choice-btn");

const score = {
  user: 0,
  computer: 0,
  ties: 0,
};

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function clearBattleState() {
  userFighterEl.classList.remove("win", "lose", "tie");
  computerFighterEl.classList.remove("win", "lose", "tie");
  choiceButtons.forEach((button) => button.classList.remove("active"));
}

function updateScores() {
  userScoreEl.textContent = score.user;
  computerScoreEl.textContent = score.computer;
  tieScoreEl.textContent = score.ties;
}

function applyChoiceToFighter(fighter, choice) {
  fighter.querySelector(".choice-icon").textContent = icons[choice];
  fighter.querySelector(".choice-name").textContent = choice;
}

function setRoundState(userChoice, computerChoice, result) {
  clearBattleState();

  applyChoiceToFighter(userFighterEl, userChoice);
  applyChoiceToFighter(computerFighterEl, computerChoice);

  const userBeatsComputer = beats[userChoice] === computerChoice;
  const computerBeatsUser = beats[computerChoice] === userChoice;

  if (result === "tie") {
    userFighterEl.classList.add("tie");
    computerFighterEl.classList.add("tie");
    resultTextEl.textContent = "It is a tie.";
    detailTextEl.textContent = `Both picked ${userChoice}. Nobody moves this round.`;
    return;
  }

  if (userBeatsComputer) {
    userFighterEl.classList.add("win");
    computerFighterEl.classList.add("lose");
    resultTextEl.textContent = "You win this round.";
    detailTextEl.textContent = `${userChoice} beats ${computerChoice}. The computer's move shrinks and tilts to show the loss.`;
    return;
  }

  if (computerBeatsUser) {
    userFighterEl.classList.add("lose");
    computerFighterEl.classList.add("win");
    resultTextEl.textContent = "Computer wins this round.";
    detailTextEl.textContent = `${computerChoice} beats ${userChoice}. Your move shrinks and tilts to show the loss.`;
  }
}

function playRound(userChoice) {
  if (!choices.includes(userChoice)) {
    return;
  }

  const computerChoice = getComputerChoice();
  choiceButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.choice === userChoice);
  });

  if (userChoice === computerChoice) {
    score.ties += 1;
    updateScores();
    setRoundState(userChoice, computerChoice, "tie");
    return;
  }

  if (beats[userChoice] === computerChoice) {
    score.user += 1;
  } else {
    score.computer += 1;
  }

  updateScores();
  setRoundState(userChoice, computerChoice, "play");
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.dataset.choice);
  });
});

resetBtn.addEventListener("click", () => {
  score.user = 0;
  score.computer = 0;
  score.ties = 0;
  updateScores();
  clearBattleState();
  userChoiceIconEl.textContent = "?";
  computerChoiceIconEl.textContent = "?";
  userChoiceTextEl.textContent = "Pick a move";
  computerChoiceTextEl.textContent = "Waiting";
  resultTextEl.textContent = "Make your move to start the round.";
  detailTextEl.textContent =
    "Rock beats scissors, scissors beats paper, and paper beats rock.";
});

updateScores();
