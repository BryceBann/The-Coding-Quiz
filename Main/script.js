//calling in id/class from HTML 
const questionEl = document.getElementsByClassName("question")
const checkers = document.getElementById("right-wrong")
const timerEl = document.getElementsByClassName("timeSpan")
const answerOne = document.getElementById("answer1")
const answerTwo = document.getElementById("answer2")
const answerThree = document.getElementById("answer3")
const answerFour = document.getElementById("answer4")
const finalScoreEl = document.getElementById("pointScore")
const nameEl = document.getElementById("initials")
const highScoreEl = document.getElementById("highScoreList")
//const randomQuestionMix = mixedQ(); comment out to address later
//test question 
var questionKey = [
{
    question: "is duck big duck",
    options: ["Fucking massive duck","widdle baby", "good eating duck"],
    correct: 0
}
];

//starting postions

let score = 0;
let currentQuestion = -1
let finalScore;

//change div to start the test
function changeDiv(curr,next){
document.getElementById(curr).classList.add('hide');
document.getElementById(next).removeAttribute('class')
};

//button to start the game
document.querySelector('#startButton').addEventListener('click', gameStart);
function gameStart() {
    changeDiv('start', 'questionHolder');
    //nextquestion();
    startTimer();
};

//timer function/Count down
function startTimer() {
    let timeLeft = 60;
   
    let timeInterval = setInterval(
    () => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if(timeLeft <= 0 ) {
            clearInterval(timeInterval);
            gameOver();
        }
        console.log(timeLeft)
    }, 1000);
};


//will end game when all questions are completed as well as populate the next question
function nextquestion() {
    currentQuestion++;
    if(currentQuestion === randomQuestionMix.length) {
        timeLeft = 0;
        gameOver();
    }else{questionEl.textContent = randomQuestionMix[currentQuestion].question;
        var arr = [answerOne, answerTwo, answerThree, answerFour];
        var i = 0;
        arr.forEach(element => {
            element.textContent = randomQuestionMix[currentQuestion].answerKey[i].answer;
            i++
       }, i);
    };
};

//controls populationg the next question after a user clicks an answer and ending the game when no mire questions left
function grabAnswer(event) {
    var answerCorrect = grabAnswer(currentQuestion);
    if(event.target.textContent === answerCorrect) {
        score += 10;
    }else{
        timeLeft -= 10;
    }
    setTimeout(
        () => {
            event.target.className = "btn";
            nextquestion();
        }, 500);
};


function answerChecker(currentQuestion) {
    var arr = randomQuestionMix[currentQuestion].answerKey;
    for(var y = 0; y < arr.length; y++) {
        if(arr[j].correct) {
            return arr[y].answer
        }
    }
};

function gameOver() {
    timerEl.textContent = 0;
    changeDiv('questionHolder', 'finishedPage');
    finalScore = score;
    finalScoreEl.textContent = finalScore;
};

function submitScore() {
    var initials = nameEl.value;

    let highScore = JSON.parse(localstorage.getItem("highScore")) || [];

    highScore.push({initials: initials, score: finalScore});
    highScore = highScore.sort((curr, next) => {
        if(curr.score < next.score) {
            return 1
        }else if(curr.score > next.score) {
            return -1
        }else{
            return 0
        }
    });

    localStorage.setItem('highscores', JSON.stringify(highScore))
    window.location.href = "./highscore.html";
};