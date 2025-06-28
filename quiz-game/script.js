//DOM elements

const startScreen = document.getElementById("start-screen")
const quizScreen = document.getElementById("quiz-screen")
const resultScreen = document.getElementById("result-screen")
const startButton = document.getElementById("start-btn")
const questionText = document.getElementById("question-text")
const answersContainer = document.getElementById("answers-container")
const currentQuestionSpan = document.getElementById("current-question")
const totalQuestionSpan = document.getElementById("total-questions")
const scoreSpan = document.getElementById("score")
const finalScoreSpan = document.getElementById("final-score")
const maxScoreSpan = document.getElementById("max-score")
const resultMessage = document.getElementById("result-message")
const restartButton = document.getElementById("restart-btn")
const progressBar = document.getElementById("progress")


const quizQuestions = [
    {
        questionText: "Who is the lead of The Godfather movie series?",
        answers: [
            { text:"Robert De Niro", correct: false },
            { text:"Marlon Brando", correct: false },
            { text: "Al Pacino", correct: true },
            { text:"Jack Nicholson", correct: false },
        ]
    },
    {
        questionText: "Who is the current James Bond?",
        answers: [
            { text:"Brad Pitt", correct: false },
            { text:"Daniel Craig", correct: true },
            { text: "Henry Cavill", correct: false },
            { text:"Benedict Cumberbatch", correct: false },
        ]
    },
    {
        questionText: "Who is the Director of latest Mission Impossible?",
        answers: [
            { text:"Cristopher McQuarrie", correct: true },
            { text:"Martin Scorcese", correct: false },
            { text: "Quentin Tarantino", correct: false },
            { text:"Sam Mendes", correct: false },
        ]
    },
    {
        questionText: "Who is the latest Oscar winner for Best Actor?",
        answers: [
            { text:"Cillian Murphy", correct: false },
            { text:"Leonardo Di Caprio", correct: false },
            { text: "Rami Malek", correct: false },
            { text:"Adrien Brody", correct: true },
        ]
    },
    {
        questionText: "How many parts of Fast and Furious?",
        answers: [
            { text:"Six", correct: false },
            { text:"Ten", correct: true },
            { text: "Twelve", correct: false },
            { text:"Eleven", correct: false },
        ]
    }
];

//QUIZ STATE VARS

let currentQuestionIndex = 0;
let score = 0
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listener

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz(){
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;
    startScreen.classList.remove("active")
    quizScreen.classList.add("active")

    showQuestion()
}

function showQuestion(){
    answerDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex]
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length)*100;
    progressBar.style.width = progressPercent + "%"
    questionText.textContent = currentQuestion.questionText

    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")

        //dataset is property of button element to store custom data.
        button.dataset.correct = answer.correct
        button.addEventListener("click", selectAnswer)
        answersContainer.appendChild(button);
    });

}

function selectAnswer(event){
    if(answerDisabled) return 
    answerDisabled = true

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"
    
    Array.from(answersContainer.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });
    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }
    setTimeout(()=>{
        currentQuestionIndex++;
        //check if quiz is over or not
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        }else{
            showResults();
        }
    },1000)
}

function showResults(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;
    const percentage = (score/quizQuestions.length)*100;
    if(percentage === 100){
        resultMessage.textContent = "Perfect! You're a Cinephile."
    }else if(percentage>=80){
        resultMessage.textContent = "Great job! You know your stuff."
    }else if(percentage>=60) {
        resultMessage.textContent = "Good Effort! Keep watching films."
    }else if(percentage>=40){
        resultMessage.textContent = "Not bad! Try again to improve!";
    }else{
        resultMessage.textContent = "Keep watching films! You'll get better"
    }
}



function restartQuiz(){
    resultScreen.classList.remove("active")
    startQuiz();
}

