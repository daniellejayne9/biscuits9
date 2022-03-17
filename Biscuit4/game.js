const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is the average number of biscuits a person in the UK buys per year?',
        choice1: '15',
        choice2: '1000',
        choice3: '500',
        choice4: '2',
        answer: 3,
    },
    {
        question: "What is Mariam's favourite Biscuit?",
        choice1: "Oreos",
        choice2: "Jammy Dodgers",
        choice3: "Cookies",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "What drink is THE drink to dunk your biscuits in?",
        choice1: "Chocolate Milk",
        choice2: "Tea",
        choice3: "Hot Chocolate",
        choice4: "Water",
        answer: 2,
    },
    {
        question: "What is Danielle's favourite Biscuit?",
        choice1: "Oreos",
        choice2: "Jammy Dodgers",
        choice3: "Cookies",
        choice4: "Party Rings",
        answer: 3,
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
});

incrementScore = num => {
    score +=num
    scoreText.innerText = score
};

startGame();