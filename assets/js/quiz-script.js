const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');
const tryAgainBtn = document.querySelector('.tryAgain-btn');

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

// Start quiz immediately
showQuestions(questionCount);
questionCounter(questionNumb);
headerScore();

// Next button functionality
nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumb++;
        showQuestions(questionCount);
        questionCounter(questionNumb);
        nextBtn.disabled = true; // Disable until an option is selected
    } else {
        showResultBox();
    }
};

// Function to display a question
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
    let optionTag = questions[index].options.map((option, i) => `
        <div class="option"><span>${option}</span></div>
    `).join('');
    optionList.innerHTML = optionTag;

    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        option.setAttribute('onclick', 'optionSelected(this)');
    });

    // Reset styles
    resetOptionStyles();
}

// Function to handle option selection
function optionSelected(answer) {
    const userAnswer = answer.textContent.trim();
    const correctAnswer = questions[questionCount].answer;
    const allOptions = optionList.children;

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore++;
    } else {
        answer.classList.add('incorrect');
        // Highlight the correct answer
        for (let i = 0; i < allOptions.length; i++) {
            if (allOptions[i].textContent.trim() === correctAnswer) {
                allOptions[i].classList.add('correct');
            }
        }
    }

    // Disable all options after selection
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.add('disabled');
    }

    nextBtn.disabled = false; // Enable the "Next" button
    headerScore(); // Update score
}

// Function to display question number
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

// Function to update score header
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

// Function to display the result box
function showResultBox() {
    quizBox.classList.remove('active'); // Hide the quiz box
    resultBox.classList.add('active'); // Show the result box

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;
    const progressEndValue = Math.round((userScore / questions.length) * 100);
    const speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#007bff ${progressStartValue * 3.6}deg, #e0e0e0 0deg)`;
        if (progressStartValue === progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}

// Reset quiz when "Try Again" is clicked
tryAgainBtn.onclick = () => {
    resultBox.classList.remove('active'); // Hide the result box
    quizBox.classList.add('active'); // Show the quiz box

    // Reset variables
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    // Reset the UI
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();

    nextBtn.disabled = true; // Disable the "Next" button
};

// Helper function to reset styles
function resetOptionStyles() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect', 'disabled');
    });
}
