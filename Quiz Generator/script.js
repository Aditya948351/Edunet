// State
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const btnCreate = document.getElementById('btn-create');
const btnPlay = document.getElementById('btn-play');
const creatorSection = document.getElementById('creator-section');
const playerSection = document.getElementById('player-section');

const questionInput = document.getElementById('question-input');
const optionA = document.getElementById('option-a');
const optionB = document.getElementById('option-b');
const optionC = document.getElementById('option-c');
const optionD = document.getElementById('option-d');
const correctAnswer = document.getElementById('correct-answer');
const addQuestionBtn = document.getElementById('add-question-btn');
const questionsContainer = document.getElementById('questions-container');
const questionCountSpan = document.getElementById('question-count');
const generateQuizBtn = document.getElementById('generate-quiz-btn');

const quizStartScreen = document.getElementById('quiz-start-screen');
const quizGameScreen = document.getElementById('quiz-game-screen');
const quizResultScreen = document.getElementById('quiz-result-screen');
const startQuizBtn = document.getElementById('start-quiz-btn');
const totalQuizQuestionsSpan = document.getElementById('total-quiz-questions');

const currentQNum = document.getElementById('current-q-num');
const totalQNum = document.getElementById('total-q-num');
const displayQuestion = document.getElementById('display-question');
const displayOptions = document.getElementById('display-options');
const nextQuestionBtn = document.getElementById('next-question-btn');

const finalScoreSpan = document.getElementById('final-score');
const correctCountSpan = document.getElementById('correct-count');
const totalCountSpan = document.getElementById('total-count');
const scoreCircleBar = document.getElementById('score-circle-bar');
const restartBtn = document.getElementById('restart-btn');
const backToCreateBtn = document.getElementById('back-to-create-btn');

// Navigation
btnCreate.addEventListener('click', () => {
    switchSection('create');
});

btnPlay.addEventListener('click', () => {
    if (questions.length === 0) {
        alert('Please add some questions first!');
        return;
    }
    switchSection('play');
});

function switchSection(section) {
    if (section === 'create') {
        creatorSection.classList.remove('hidden-section');
        creatorSection.classList.add('active-section');
        playerSection.classList.add('hidden-section');
        playerSection.classList.remove('active-section');
        btnCreate.classList.add('active');
        btnPlay.classList.remove('active');
    } else {
        playerSection.classList.remove('hidden-section');
        playerSection.classList.add('active-section');
        creatorSection.classList.add('hidden-section');
        creatorSection.classList.remove('active-section');
        btnPlay.classList.add('active');
        btnCreate.classList.remove('active');
        prepareQuizStart();
    }
}

// Creator Logic
addQuestionBtn.addEventListener('click', () => {
    const qText = questionInput.value.trim();
    const optA = optionA.value.trim();
    const optB = optionB.value.trim();
    const optC = optionC.value.trim();
    const optD = optionD.value.trim();
    const correct = correctAnswer.value;

    if (!qText || !optA || !optB || !optC || !optD) {
        alert('Please fill in all fields.');
        return;
    }

    const newQuestion = {
        id: Date.now(),
        question: qText,
        options: {
            a: optA,
            b: optB,
            c: optC,
            d: optD
        },
        correct: correct
    };

    questions.push(newQuestion);
    renderQuestionsList();
    clearInputs();
    updateQuizButtonState();
});

function renderQuestionsList() {
    questionsContainer.innerHTML = '';
    questionCountSpan.textContent = questions.length;

    if (questions.length === 0) {
        questionsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-folder-open"></i>
                <p>No questions added yet. Start creating!</p>
            </div>
        `;
        return;
    }

    questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.className = 'question-item';
        div.innerHTML = `
            <span class="q-text">${index + 1}. ${q.question}</span>
            <button class="delete-btn" onclick="deleteQuestion(${q.id})">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        questionsContainer.appendChild(div);
    });
}

window.deleteQuestion = (id) => {
    questions = questions.filter(q => q.id !== id);
    renderQuestionsList();
    updateQuizButtonState();
};

function clearInputs() {
    questionInput.value = '';
    optionA.value = '';
    optionB.value = '';
    optionC.value = '';
    optionD.value = '';
    correctAnswer.value = 'a';
    questionInput.focus();
}

function updateQuizButtonState() {
    generateQuizBtn.disabled = questions.length === 0;
}

generateQuizBtn.addEventListener('click', () => {
    switchSection('play');
});

// Player Logic
function prepareQuizStart() {
    quizStartScreen.classList.remove('hidden');
    quizGameScreen.classList.add('hidden');
    quizResultScreen.classList.add('hidden');
    totalQuizQuestionsSpan.textContent = questions.length;
}

startQuizBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    quizStartScreen.classList.add('hidden');
    quizGameScreen.classList.remove('hidden');
    loadQuestion();
});

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    currentQNum.textContent = currentQuestionIndex + 1;
    totalQNum.textContent = questions.length;
    displayQuestion.textContent = q.question;
    
    displayOptions.innerHTML = '';
    const options = ['a', 'b', 'c', 'd'];
    
    options.forEach(key => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = q.options[key];
        btn.dataset.key = key;
        btn.addEventListener('click', selectOption);
        displayOptions.appendChild(btn);
    });

    nextQuestionBtn.classList.add('hidden');
}

function selectOption(e) {
    const selectedBtn = e.target;
    const selectedKey = selectedBtn.dataset.key;
    const currentQ = questions[currentQuestionIndex];
    
    // Disable all buttons
    const allOptions = displayOptions.querySelectorAll('.option-btn');
    allOptions.forEach(btn => btn.disabled = true);

    if (selectedKey === currentQ.correct) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
        // Highlight correct answer
        allOptions.forEach(btn => {
            if (btn.dataset.key === currentQ.correct) {
                btn.classList.add('correct');
            }
        });
    }

    nextQuestionBtn.classList.remove('hidden');
}

nextQuestionBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizGameScreen.classList.add('hidden');
    quizResultScreen.classList.remove('hidden');
    
    const percentage = Math.round((score / questions.length) * 100);
    finalScoreSpan.textContent = percentage;
    correctCountSpan.textContent = score;
    totalCountSpan.textContent = questions.length;

    // Animate circle
    // Circumference is 2 * PI * 70 ≈ 440
    const offset = 440 - (440 * percentage) / 100;
    scoreCircleBar.style.strokeDashoffset = offset;
}

restartBtn.addEventListener('click', () => {
    prepareQuizStart();
    startQuizBtn.click();
});

backToCreateBtn.addEventListener('click', () => {
    switchSection('create');
});
