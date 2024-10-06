const questions = [
    {
      question: "What is the closest planet to the Sun?",
      answers: [
        { text: "Mercury", correct: true },
        { text: "Venus", correct: false },
        { text: "Earth", correct: false },
        { text: "Mars", correct: false }
      ]
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: false },
        { text: "Venus", correct: false }
      ]
    },
    {
      question: "How many planets are in our solar system?",
      answers: [
        { text: "8", correct: true },
        { text: "9", correct: false },
        { text: "7", correct: false },
        { text: "6", correct: false }
      ]
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: [
        { text: "Jupiter", correct: true },
        { text: "Saturn", correct: false },
        { text: "Earth", correct: false },
        { text: "Neptune", correct: false }
      ]
    },
    {
      question: "Which planet is known for its rings?",
      answers: [
        { text: "Saturn", correct: true },
        { text: "Uranus", correct: false },
        { text: "Neptune", correct: false },
        { text: "Jupiter", correct: false }
      ]
    },
    // Add 30 more questions in a similar format
  ];

  // DOM elements
  const startButton = document.getElementById('start-btn');
  const nextButton = document.getElementById('next-btn');
  const questionContainerElement = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const scoreContainer = document.getElementById('score-container');
  const scoreElement = document.getElementById('score');
  const restartButton = document.getElementById('restart-btn');

  let shuffledQuestions, currentQuestionIndex;
  let score = 0;

  startButton.addEventListener('click', startGame);
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
  });
  restartButton.addEventListener('click', restartGame);

  function startGame() {
    startButton.classList.add('hidden');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionContainerElement.classList.remove('hidden');
    scoreContainer.classList.add('hidden');
    setNextQuestion();
  }

  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn-answer');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }

  function resetState() {
    nextButton.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
      score++;
      scoreElement.innerText = score;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hidden');
    } else {
      showScore();
    }
  }

  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }

  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  function showScore() {
    questionContainerElement.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    restartButton.classList.remove('hidden');
  }

  function restartGame() {
    startButton.classList.remove('hidden');
    restartButton.classList.add('hidden');
    scoreContainer.classList.add('hidden');
  }