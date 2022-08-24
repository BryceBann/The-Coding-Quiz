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
answer: "7.6 == \"7.6\""
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
 question: "Wich one is the Increment operator.",
 choiceOne: "**",
choiceTwo: "/",
choiceThree: "++",
choiceFour: "+=",
answer: "++"
 }
];

//starting postions
let timeLeft = 60;
let score = 0;
let currentQuestion = -1
let finalScore;
let timeInterval;
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
    startTimer();
};

//timer function/Count down
function startTimer() {
   
    let timeInterval = setInterval(
    () => {
        timeLeft--;
        document.getElementById("timeSpan").innerHTML = timeLeft
        if(timeLeft <= 0 ) {
            clearInterval(timeInterval);
            gameOver();
        }
        
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
    //console.log(event)
    //console.log(event.target.className)
    //console.log(event.target.textContent)
    if(event.target.className === "btn") {
        console.log(event.target.textContent, questionKey[currentQuestion].answer)
        if(event.target.textContent === questionKey[currentQuestion].answer){
            score += 10
            console.log("correct")
            console.log(score)
         }else{
            if(timeLeft >= 10){
                console.log(timeLeft)
                timeLeft = timeLeft-10;
                document.getElementById("timeSpan").innerHTML = timeLeft
            console.log("not correct")
            }else{
                timeLeft = 0;
                gameOver();
            }
         }
     currentQuestion++;

     if(currentQuestion  == questionKey.length) {
        clearInterval(setInterval);
        gameOver();
     }else{
     displayQuestion();
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