const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "London"],
    selectedOption: null,
    answer: 2,
    explanation: "The capital of France is Paris.",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Pablo Picasso",
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    selectedOption: null,
    answer: 2,
    explanation: "The Mona Lisa was painted by Leonardo da Vinci.",
  },
  {
    question: "What is the symbol for Iron on the periodic table?",
    options: ["In", "Fe", "I", "Ir"],
    selectedOption: null,
    answer: 1,
    explanation: "The symbol for Iron on the periodic table is Fe.",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    selectedOption: null,
    answer: 1,
    explanation: "Mars is known as the Red Planet.",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Pacific Ocean",
      "Indian Ocean",
      "Arctic Ocean",
    ],
    selectedOption: null,
    answer: 1,
    explanation: "The largest ocean on Earth is the Pacific Ocean.",
  },
];

let currentQuestion = 0;
let score = 0;
let quizEnd = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const playAgainBtn = document.getElementById("play-again");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const quizContainer = document.querySelector(".quiz-container");
const timerElement = document.getElementById("timer");

let timeLeft = 20;

const updateTimer = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
const decrementTimer = () => {
  timeLeft--;
  updateTimer();

  if (timeLeft === 0) {
    clearInterval(timerInterval);
    endQuiz();
  }
};
let timerInterval = setInterval(decrementTimer, 1000);

const displayQuestion = () => {
  const question = quizData[currentQuestion];
  questionElement.textContent = question.question;

  optionsElement.innerHTML = "";
  question.options.forEach((optionText, index) => {
    const option = document.createElement("li");
    option.textContent = optionText;
    option.onclick = handleAnswer;
    optionsElement.appendChild(option);

    if (question.selectedOption === index) option.classList.add("selected");
  });

  prevBtn.disabled = currentQuestion === 0;
};

function handleAnswer() {
  if (quizEnd) {
    return;
  }

  const selectedOption = this;
  const question = quizData[currentQuestion];
  const selectedOptionIndex = Array.from(optionsElement.children).indexOf(
    selectedOption
  );

  if (question.answer === selectedOptionIndex) score += 10;

  question.selectedOption = selectedOptionIndex;
  currentQuestion++;

  if (currentQuestion < quizData.length) displayQuestion();
  else endQuiz();
}

const prevQuestion = () => {
  currentQuestion--;

  if (currentQuestion >= 0) displayQuestion();
  else currentQuestion = 0;
};

const nextQuestion = () => {
  currentQuestion++;

  if (currentQuestion < quizData.length) displayQuestion();
  else endQuiz();
};

const endQuiz = () => {
  quizEnd = true;
  clearInterval(timerInterval);
  resultElement.children[0].textContent = "Quiz ended!";
  scoreElement.textContent = "Your score: " + score + "/50";
  resultElement.style.display = "flex";
  scoreElement.style.display = "block";
  playAgainBtn.style.display = "block";
  quizContainer.style.display = "none";

  quizData.forEach((question) => {
    question.selectedOption = null;
  });
};

const playAgain = () => {
  currentQuestion = 0;
  score = 0;
  quizEnd = false;

  startQuiz();
};

const startQuiz = () => {
  quizContainer.style.display = "block";
  resultElement.style.display = "none";
  scoreElement.style.display = "none";

  timeLeft = 20;
  updateTimer();
  displayQuestion();
  clearInterval(timerInterval);
  timerInterval = setInterval(decrementTimer, 1000);
  displayQuestion();
};

nextBtn.addEventListener("click", nextQuestion);
prevBtn.addEventListener("click", prevQuestion);
playAgainBtn.addEventListener("click", playAgain);

startQuiz();
