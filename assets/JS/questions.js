function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    var element = document.getElementById("success");
    element.innerHTML = "Wrong Answer";
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        element.innerHTML = "Correct Answer";
    }
    else{
        // Reduce time for wrong answer.
        if (remainingSeconds > 0){
            remainingSeconds = remainingSeconds - 15;
        }   
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
function start() {
    document.querySelector('#time').textContent = 75;
    startTimer(75, document.querySelector('#time'));
    var start = document.getElementById("start-screen");
    start.style.display ="none";
    populate();
} 
function populate() {
  
    if(quiz.isEnded() || remainingSeconds == 0) {
        showScores();
    }
    else {
        var quizElement = document.getElementById("quiz");
        quizElement.style.display ="block";
        var buttonElement = document.getElementById("start");
        buttonElement.style.display ="none";
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        //clearTimer();
        populate();
    }
};
 

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    var highScores = document.getElementById("end-screen");
    highScores.style.display ="block";
    var element = document.getElementById("scores");
    element.style.display ="none";
    
};

/* function highScores() {
    var gameOverHTML = "<h1>High Scores</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
}; */
 
// create questions here
var questions = [
    new Question("Commonly used data types DO NOT include:", ["strings", "booleans", "alerts", "numbers"], "alerts"),
    new Question("The condition in an if / else statement is enclosed within ____.", ["quotes", "curly brackets", "parentheses", "square brackets"], "parentheses"),
    new Question("Arrays in JavaScript can be used to store ____.", ["numbers and strings",
    "other arrays","booleans","all of the above"], "all of the above"),
    new Question("String values must be enclosed within ____ when being assigned to variables.", ["commas", "curly brackets", "quotes", "parentheses"], "quotes"),
    new Question("A very useful tool used during development and debugging for printing content to the debugger is:", ["JavaScript", "terminal / bash", "for loops", "console.log"], "console.log")
];

var remainingSeconds = 75;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        if (remainingSeconds >0){
            remainingSeconds--;
        }      
        display.textContent = remainingSeconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function saveHighscore() {
    var element = document.getElementById("quiz");
    element.style.display = "none";
    // get value of input box
    var initials = document.querySelector("#initials").value.trim();
  
    if (initials !== "") {
      // get saved scores from localstorage, or if not any, set to empty array
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      // format new score object for current user
      var newScore = {
        score: quiz.score,
        initials: initials
      };
  
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
      var element = document.getElementById("end-screen");
      element.style.display = "none";
      printHighScores();

    }
  }

  function printHighScores() {
    // either get scores from localstorage or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // sort highscores by score property in descending order
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // create li tag for each high score
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
      // display on page
      var olEl = document.getElementById("highscoreslist");
      olEl.appendChild(liTag);
    });
    var highScores = document.getElementById("highscoreslist");
    highScores.style.display ="block";

  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }

  function goback() {
    window.location.reload();
  }


 
// create quiz
var quiz = new Quiz(questions);
 

