// JS File for Quiz Master


// Lets prepare the quiz object.

var quizObj = [
  {
    question: "Question",
    answer: "Answer",
    // Options
    options:[
      "Option 1", 
      "Option 2", 
      "Option 3"
    ]
  },
  {
    question: "Question 2",
    answer: "Answer 2",
    // Options
    options:[
      "Option 2.1", 
      "Option 2.2", 
      "Option 2.3"
    ]
  },
  {
    question: "Question 3",
    answer: "Answer 3",
    // Options
    options:[
      "Option 3.1", 
      "Option 3.2", 
      "Option 3.3", 
      "Option 3.4"
    ]
  }
];

var quizContainer = document.getElementById('quiz-container');

var k = 0;

// Lets build the timer

var timer = document.getElementById('timer');
var totalSeconds = 0;
var secondsElapsed = 0;
var interval;

function setTime() {

  secondsElapsed = totalSeconds;

  interval = setInterval(function() {

  secondsElapsed--;

  //var minutes = Math.floor(secondsElapsed / 60);
  var seconds = Math.floor(secondsElapsed % 60);

  //minutesDisplay.innerHTML = minutes;
  timer.innerHTML = seconds;
  
  if(secondsElapsed === 0) {
    stopTimer();
  }

  }, 1000);
}

function stopTimer() {
    console.log('stop');
    clearInterval(interval);
//      sendMessage();

}

function startTimer() {

  totalSeconds = 100 * 60;
  clearInterval(interval);  
  setTime();

}

var highscore = document.getElementById('highscore'),
    chart = document.getElementById('chart-score'),
    completed = document.getElementById('quiz-completed'),
    scoreDisplay = document.getElementById('final-score'),
    initialValue = document.getElementById('initials'),
    initialSubmitButton = document.getElementById('initials-submit-button')
    highscoreChart = document.getElementById('highscore-chart'),
    quizIntro = document.getElementById('quiz-intro'),
    navBar = document.getElementById('nav'),
    backButton = document.getElementById('back'),
    clearButton = document.getElementById('clear');

function displayHighscoreChart() {
  highscoreChart.classList.add('active');
  
  quizIntro.classList.add('inactive');
  navBar.classList.add('inactive');

  var allScores = localStorage.getItem('score');

  if (allScores) {
    allScores = JSON.parse(allScores ? allScores : "[]");
  
    allScores.forEach(function(data) {
      
  // Check to see if the scoresData variable is filled.
  if (scoresData) {
    scoresData = JSON.parse(scoresData ? scoresData : "[]");
  
    scoresData.forEach(function(data) {
      
      var scoreItem = document.createElement('li');
      scoreItem.innerHTML = "<span class='name'>" + data.initials + "</span>";
      scoreItem.innerHTML += "<span class='score'>" + data.score + "</span>";
      chart.append(scoreItem);
      
    }) 
  }
}

function hideHighscoreChart() {
  highscoreChart.classList.remove('active');
  navBar.classList.remove('inactive');
  quizIntro.classList.remove('inactive');
  chart.innerHTML = '';
}

function clearHighscoreChart() {
  localStorage.removeItem('score');
  chart.innerHTML = '';
}

highscore.addEventListener('click', displayHighscoreChart);
backButton.addEventListener('click', hideHighscoreChart);
clearButton.addEventListener('click', clearHighscoreChart);


function completedQuiz(){
  completed.classList.add('active');

  //var score = secondsElapsed;
  var score = Math.floor(secondsElapsed % 60);
  scoreDisplay.innerText = score;
  
  secondsElapsed = 0;
  stopTimer();

 

  initialSubmitButton.addEventListener('click', function() {

    completed.classList.remove('active');

     // Check to see if there is a "score" data included.
    var data = localStorage.getItem('score');
    var allScores = JSON.parse(data ? data : "[]");

    console.log(allScores);

    var newEntry = {
      initials: initialValue.value,
      score: score
    }

    allScores.push(newEntry);
    allScores.sort((a, b) => (a.score > b.score) ? -1: 1);
    allScores.slice(10);

    localStorage.setItem('score', JSON.stringify(allScores));
    

    displayHighscoreChart();

  });

}



function buildQuiz(level=0, arrIndex = 0) {
  
  //document.createElement('h2'

  if (level) {
    var quizInfo = quizObj[arrIndex].options;
        quizInfo.push(quizObj[arrIndex].answer);
    var quizLength = quizInfo.length;
  } else {
    var quizInfo = quizObj;
    var quizLength = quizInfo.length;
  }

  var quizTemplate = [];
  var clonedQuiz = [];


  for(var o=0;o<quizLength;o++) {

    if (level) {

      var choiceItem = document.createElement('li');
      choiceItem.innerHTML = quizInfo[o];

      var template = document.getElementById('quiz-template-' + arrIndex);
      
      var choices = template.getElementsByTagName('ul')[0];
      choices.append(choiceItem);

      choiceItem.addEventListener('click', function() {
 
        
        if (this.innerText === quizObj[arrIndex].answer) {
          //secondsElapsed = secondsElapsed + 15;
          template.classList.remove('active');

          if (parseInt(arrIndex+1) < quizObj.length) {       
            var nextQuiz = document.getElementById('quiz-template-' + parseInt(arrIndex+1));
            nextQuiz.classList.add('active');
          }
          else {
            // This should have been the final question, so lets return the result.
            completedQuiz();
          }
        
        } else {
          secondsElapsed = parseInt(secondsElapsed) - 10;

          template.lastElementChild.innerHTML = "Incorrect!";
          template.lastElementChild.classList.add('highlight');

          setTimeout(function() {
            template.lastElementChild.innerHTML = "";
            
            template.lastElementChild.classList.remove('highlight');
          }, 2000);

        }

      });


    } else {

      quizTemplate[o] = document.getElementById('quiz-template');
      clonedQuiz[o] = quizTemplate[o].cloneNode(true);
      clonedQuiz[o].id = 'quiz-template-' + o;
      quizContainer.append(clonedQuiz[o]);
      
      var header = clonedQuiz[o].getElementsByTagName('h2')[0];
      header.innerHTML = quizInfo[o].question;

      buildQuiz(1, o);
    }
  }

  if (!level) {
    var block = document.getElementsByClassName('quiz-block');
  }

}



function startQuiz() {

  var startQuizButton = document.getElementById('quiz-start-button');

  startQuizButton.addEventListener('click', function() {

    startTimer();

    quizIntro.classList.add('inactive');

    var quizBlocks = document.getElementsByClassName('quiz-block');

    quizBlocks[1].classList.add('active');

  });

}

buildQuiz();

startQuiz();
