//calling in id/class from HTML 
const questionEl = document.getElementsByClassName("question")
const checkers = document.getElementById("right-wrong")
const timerEl = document.getElementsByClassName("timer")
const answerOne = document.getElementById("answer1")
const answerTwo = document.getElementById("answer2")
const answerThree = document.getElementById("answer3")
const answerFour = document.getElementById("answer4")
//test question 
var questionKey = [
{
    question: "is duck big duck",
    options: ["Fucking massive duck","widdle baby", "good eating duck"],
    correct: 0
}
]

//starting postions
let timeLeft = 75;
let Score = 0;
let currentQuestion = -1
let finalScore;

//change div to start the test
function changeDiv(curr,next){
document.getElementById(curr).classList.add('hide');
document.getElementById(next).removeAttribute('class')
};

//button to start the game
function gameStart() {
    changeDiv('start', 'questionHolder');
    nextquestion();
    startTimer();
}

//timer function/Count down
function startTimer() {
    timerEl.textContent = timeLeft;
    var timeChange = setInterval(
    () => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if(timeLeft <= 0 ) {
            clearInterval(timeChange);
            gameOver();
        }
    }, 1000);
}

function nextquestion() {
    currentQuestion++;
    if(currentQuestion === randomQuestionMix.length) {
        timeLeft = 0;
        gameOver();
    }else{questionEl.textContent = randomQuestionMix[currentQuestion].question;

        var arr = [answerOne, answerTwo, answerThree, answerFour];
        var i = 0;
        arr.forEach(element => {
            element.textContent = randomQuestionMix[currentQuestion].arrAnswer[i].answer;
            i++
       }, i);
    };
};