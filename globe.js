// Questions for each level
const level1Questions = [
  {
      question: "What is a major effect of rapid urbanization?",
      options: ["Decreased traffic", "Increased water resources", "Loss of green spaces", "Lower population density"],
      correctAnswer: 1
  },
  {
      question: "Urbanization contributes most to which of the following problems?",
      options: ["Overfishing", "Soil erosion", "Air pollution", "Deforestation"],
      correctAnswer: 1
  },
  {
      question: "How does urbanization affect natural habitats?",
      options: ["Creates new forests", "Improves biodiversity", "Destroys habitats", "Increases water levels"],
      correctAnswer: 1
  },
  {
      question: "Which of the following is a solution to urbanization problems?",
      options: ["Urban sprawl", "Planting more trees", "More factories", "Reducing public transportation"],
      correctAnswer: 1
  },
  {
      question: "Which area experiences the most impact from urbanization?",
      options: ["Rural areas", "Coastal regions", "Urban centers", "Mountainous regions"],
      correctAnswer: 1
  }
];

const level2Questions = [
  {
      question: "What is one of the primary causes of water pollution?",
      options: ["Plastic waste", "Noise pollution", "Urban heat", "Air pollution"],
      correctAnswer: 0
  },
  {
      question: "Which human activity commonly leads to water pollution?",
      options: ["Fishing", "Deforestation", "Agricultural runoff", "Hiking"],
      correctAnswer: 2
  },
  {
      question: "How does water pollution affect marine life?",
      options: ["No effect", "Improves breeding", "Leads to habitat loss", "Increases population"],
      correctAnswer: 2
  },
  {
      question: "Which of the following reduces water pollution?",
      options: ["Using more plastic", "Proper waste disposal", "Building dams", "Increased urbanization"],
      correctAnswer: 1
  },
  {
      question: "What is one consequence of water pollution?",
      options: ["Increase in fish population", "Clean drinking water", "Dead zones in oceans", "More trees"],
      correctAnswer: 2
  }
];

// Add similar questions for level3, level4, level5...

// Create quiz elements for each level
function createQuiz(questions, quizContainer) {
  questions.forEach((questionObj, index) => {
      const questionElement = document.createElement('div');
      questionElement.classList.add('question');
      questionElement.innerHTML = `<p>${index + 1}. ${questionObj.question}</p>`;
      questionObj.options.forEach((option, optionIndex) => {
          questionElement.innerHTML += `
              <input type="radio" name="question${index}" value="${optionIndex}">
              <label>${option}</label><br>`;
      });
      quizContainer.appendChild(questionElement);
  });
}

// Function to check answers for any level and update the team score
function checkAnswers(questions, quizContainer, teamName) {
    let score = 0;
    questions.forEach((question, index) => {
        const selectedOption = quizContainer.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === question.correctAnswer) {
            score++;
        }
    });

    // If the score is above the threshold, update the team score on the server
    if (score >= 3) {
        updateTeamScore(teamName, score);
    }

    return score;
}

// Function to send the updated score to the server
function updateTeamScore(teamName, score) {
    fetch('/updateScore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            teamName: teamName,
            score: score
        })
    })
    .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
    .then(data => {
        if (data.message) {
            console.log('Score updated:', data.message);
        }
    })
    .catch(error => console.error('Error updating score:', error));
}

// Unlock next level and display result
function unlockNextLevel(level) {
  const nextLevel = document.getElementById(`level-${level}`);
  nextLevel.classList.remove('locked');
  nextLevel.querySelector('h2').innerText = `Level ${level}: Ready`;
}

// Display quiz for each level
const quiz1Container = document.getElementById('quiz-1');
createQuiz(level1Questions, quiz1Container);

const quiz2Container = document.getElementById('quiz-2');
createQuiz(level2Questions, quiz2Container);

// Add similar quiz container creation for levels 3, 4, and 5...

// Event listeners for each level's submission
document.getElementById('submit-level-1').addEventListener('click', () => {
    const teamName = "Nasa_team";  // Replace with dynamic team name if needed
    const level1Score = checkAnswers(level1Questions, quiz1Container, teamName);
    if (level1Score >= 3) {
        unlockNextLevel(2);
        document.getElementById('result').innerText = `You passed Level 1 with a score of ${level1Score}! Level 2 is now unlocked.`;
    } else {
        document.getElementById('result').innerText = `You scored ${level1Score}/5 on Level 1. Try again!`;
    }
});

document.getElementById('submit-level-2').addEventListener('click', () => {
    const teamName = "Nasa_team";  // Replace with dynamic team name if needed
    const level2Score = checkAnswers(level2Questions, quiz2Container, teamName);
    if (level2Score >= 3) {
        unlockNextLevel(3);
        document.getElementById('result').innerText = `You passed Level 2 with a score of ${level2Score}! Level 3 is now unlocked.`;
    } else {
        document.getElementById('result').innerText = `You scored ${level2Score}/5 on Level 2. Try again!`;
    }
});

// Similar event listeners for level 3, 4, and 5...

// CSS classes for locked levels
document.querySelectorAll('.locked').forEach(level => {
  level.style.pointerEvents = 'none';
  level.style.opacity = '0.5';
});
