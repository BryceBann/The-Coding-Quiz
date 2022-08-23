//calling in id/class from HTML 
const questionEl = document.getElementById("question")
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
choiceOne: "x = 6",
choiceTwo: "x = \"87\"",
choiceThree: "x = true",
choiceFour: "x;",
answer: "x = \"87\""
},

{
question: "choose the operator that checks for value and type.", 
choiceOne: "=",
choiceTwo: "+=",
choiceThree: "===",
choiceFour: "<=;",
answer: "==="
},

{
question: "choose  the true statment.",
choiceOne: "4 != 4",
choiceTwo: "4 > 85",
choiceThree: "7 === \"7\"",
choiceFour: "7.6 == \"7.6\"",
answer: "7.6 == \"76\""
},

{
 question: "which data type is not primitive.",
 choiceOne: "boolean",
choiceTwo: "array",
choiceThree: "number",
choiceFour: "string",
answer: "array"
 },

 {
 question: "WHich one is the Increment operator.",
 choiceOne: "**",
choiceTwo: "/",
choiceThree: "++",
choiceFour: "+=",
answer: "++"
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
    currentQuestion = 0;
    displayQuestion();
   // startTimer();
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

function displayQuestion() {
questionEl.textContent = questionKey[currentQuestion].question
answerOne.textContent = questionKey[currentQuestion].choiceOne
answerTwo.textContent = questionKey[currentQuestion].choiceTwo
answerThree.textContent = questionKey[currentQuestion].choiceThree
answerFour.textContent = questionKey[currentQuestion].choiceFour
}
//will end game when all questions are completed as well as populate the next question
document.querySelector('#questionHolder').addEventListener('click', nextquestion);
 function nextquestion(event) {
    console.log(event)
    console.log(event.target.className)
    console.log(event.target.textContent)
    if(event.target.className === "btn") {
        console.log(event.target.textContent, questionKey[currentQuestion].answer)
        if(event.target.textContent === questionKey[currentQuestion].answer){
            console.log("correct")
         }else{
            console.log("not correct")
         }
     currentQuestion++;
     displayQuestion();
    }
    
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