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
   question: "which variable has the value of a string.",
arrAnswer: [
    {answer: "x = 6", correct: false},
    {answer: "x = \"87\"" , correct: true},
    {answer: "x = true", correct: false},
    {answer: "x;", correct: false}]
},

{
question: "choose the operator that checks for value and type.",
arrAnswer: [
    {answer: "=", correct: false},
    {answer: "+=", correct:  false},
    {answer: "===", correct:  true},
    {amswer: "<=", correct: false}]
},

{
question: "choose  the true statment.",
arrAnswer: [
    {answer: "4 != 4", correct: false},
    {answer: "4 > 85", correct: false},
    {answer: "7 === \"7\"", correct: true},
    {answer: "7.6 == \"7.6\"", correct: false}]
},

{
question: "which data type is not primitive.",
arrAnswer: [
   {answer: "boolean", correct: false},
   {answer: "array", correct: true},
   {answer: "number", correct: false},
   {amswer: "string", correct: false}]
},

{
question: "WHich one is the Increment operator.",
arrAnswer:[
    {amswer: "**", correct: false},
    {answer: "/", correct: false},
    {amswer: "++", correct: true},
    {amswer: "+=", correct: false}]
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

//button to start the game, this button will start the functions to cnage the on screen div and start the count down timer
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
        document.getElementById("timeSpan").innerHTML = timeLeft
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
    //question key is empty end game
    if(currentQuestion === randomQuestionMix.length) {
        timeLeft = 0;
        gameOver();
        //if not add the next question 
    }else{questionEl.textContent = randomQuestionMix[currentQuestion].question;
        //add in the next questions answers
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

//checks if answer is correct by looping through the arrAmswer
function answerChecker(currentQuestion) {
    var arr = randomQuestionMix[currentQuestion].answerKey;
    for(var y = 0; y < arr.length; y++) {
        if(arr[y].correct) {
            //gives the correct answer
            return arr[y].answer
        }
    }
};

//the game is over and logs your  current score
function gameOver() {
    timerEl.textContent = 0;
    changeDiv('questionHolder', 'finishedPage');
    finalScore = score;
    finalScoreEl.textContent = finalScore;
};

function submitScore() {
    var initials = nameEl.value;
    //grab the array from storage or create a new one and push the final score to the array
    let highScore = JSON.parse(localstorage.getItem("highScore")) || [];
    highScore.push({initials: initials, score: finalScore});
    //sort the score
    highScore = highScore.sort((curr, next) => {
        if(curr.score < next.score) {
            return 1
        }else if(curr.score > next.score) {
            return -1
        }else{
            return 0
        }
    });
    //put the updated or new array to local storage and got to highscore page
    localStorage.setItem('highscores', JSON.stringify(highScore))
    window.location.href = "./highscore.html";
};