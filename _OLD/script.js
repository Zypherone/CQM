// JS File for Quiz Master

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Lets prepare the quiz object.

var quizObj = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answer: "&lt;script&gt;",
    // Options
    options:[
      "&lt;javascript&gt;", 
      "&lt;js&gt;", 
      "&lt;scripting&gt;"
    ]
  },
  {
    question: "What is the correct JavaScript syntax to change the content of the HTML element below?<br/><br />&lt;p id=\"demo\"&gt;This is a demonstration.&lt;/p&gt;",
    answer: "document.getElementById(\"demo\").innerHTML = \"Hello World!\";",
    // Options
    options:[
      "document.getElement(\"p\").innerHTML = \"Hello World!\";", 
      "document.getElementByName(\"p\").innerHTML = \"Hello World!\";", 
      "#demo.innerHTML = \"Hello World!\";"
    ]
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answer: "Both the &lt;head&gt; section and the &lt;body&gt; section are correct",
    // Options
    options:[
      "The &lt;head&gt; section", 
      "The &lt;body&gt; section"
    ]
  },
  {
    question: "What is the correct syntax for referring to an external script called \"xxx.js\"?",
    answer: "&lt;script src=\"xxx.js\"&gt;",
    // Options
    options:[
      "&lt;script name=\"xxx.js\"&gt;", 
      "&lt;script href=\"xxx.js\"&gt;"
    ]
  },
  {
    question: "The external JavaScript file must contain the &lt;script&gt; tag.?",
    answer: "False",
    // Options
    options:[
      "True"
    ]
  },
  {
    question: "How do you write \"Hello World\" in an alert box?",
    answer: "alert(\"Hello World\");",
    // Options
    options:[
      "msgBox(\"Hello World\");",
      "msg(\"Hello World\");",
      "alertBox(\"Hello World\");",
    ]
  },
  {
    question: "How do you create a function in JavaScript?",
    answer: "function myFunction()",
    // Options
    options:[
      "function:myFunction()",
      "function = myFunction()"
    ]
  },
  {
    question: "How do you call a function named \"myFunction\"?",
    answer: "myFunction()",
    // Options
    options:[
      "call myFunction()",
      "call function myFunction()"
    ]
  },  
  {
    question: "How to write an IF statement in JavaScript?",
    answer: "if (i == 5)",
    // Options
    options:[
      "if i == 5",
      "if i = 5 then",
      "if i = 5"
    ]
  },
  {
    question: "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
    answer: "if (i != 5)",
    // Options
    options:[
      "if i != 5 then",
      "if i &lt;&gt; 5",
      "if (i &lt;&gt; 5)"
    ]
  },
  {
    question: "How does a WHILE loop start?",
    answer: "while (i &lt;= 10)",
    // Options
    options:[
      "while (i &lt;= 10; i++)",
      "while i = 1 to 10"
    ]
  },
  {
    question: "How does a FOR loop start?",
    answer: "for (i = 0; i &lt;= 5; i++)",
    // Options
    options:[
      "for (i = 0; i &lt;= 5)",
      "for (i &lt;= 5; i++)",
      "for i = 1 to 5"
    ]
  },
  {
    question: "How can you add a comment in a JavaScript?",
    answer: "//This is a comment",
    // Options
    options:[
      "'This is a comment",
      "&lt;!--This is a comment--&gt;"
    ]
  },
  {
    question: "How to insert a comment that has more than one line?",
    answer: "/*This comment has<br>more than one line*/",
    // Options
    options:[
      "&lt;!--This comment has<br>more than one line--&gt;",
      "//This comment has<br>more than one line//"
    ]
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    answer: " var colors = [\"red\", \"green\", \"blue\"]",
    // Options
    options:[
      "var colors = \"red\", \"green\", \"blue\"",
      "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")",
      "var colors = (1:\"red\", 2:\"green\", 3:\"blue\")"
    ]
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    answer: " var colors = [\"red\", \"green\", \"blue\"]",
    // Options
    options:[
      "var colors = \"red\", \"green\", \"blue\"",
      "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")",
      "var colors = (1:\"red\", 2:\"green\", 3:\"blue\")"
    ]
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    answer: "Math.round(7.25)",
    // Options
    options:[
      "Math.rnd(7.25)",
      "round(7.25))",
      "rnd(7.25)"
    ]
  }
];

// Lets prepare all the variables and get all the relavant IDs.
var timer = document.getElementById('timer'),
    totalSeconds = 0,
    secondsElapsed = 0,
    interval,
    highscore = document.getElementById('highscore'),
    quizContainer = document.getElementById('quiz-container')
    chart = document.getElementById('chart-score'),
    startQuizButton = document.getElementById('quiz-start-button'),
    completed = document.getElementById('quiz-completed'),
    scoreDisplay = document.getElementById('final-score'),
    initialValue = document.getElementById('initials'),
    initialSubmitButton = document.getElementById('initials-submit-button')
    highscoreChart = document.getElementById('highscore-chart'),
    quizIntro = document.getElementById('quiz-intro'),
    navBar = document.getElementById('nav'),
    backButton = document.getElementById('back'),
    clearButton = document.getElementById('clear');

function setTime() {

  secondsElapsed = totalSeconds;

  interval = setInterval(function() {

    secondsElapsed--;

    //var seconds = Math.floor(secondsElapsed % 60);

    timer.innerText = Math.floor(secondsElapsed % 60);
    
    if(secondsElapsed < 0) {

      alert("TImes up!");
      stopTimer();
      completedQuiz();
      
      // Lets check if there are any active quizes due to timer running out.
      var anyActiveQuizes = document.getElementsByClassName('quiz-block active');
      if (anyActiveQuizes) {
        anyActiveQuizes[0].classList.remove('active');
      }
    }

  }, 1000);
}

function stopTimer() {
  secondsElapsed = 0;
  clearInterval(interval);
}

function startTimer() {

  totalSeconds = 1 * 60;
  clearInterval(interval);  
  setTime();

}

function displayHighscoreChart() {
  highscoreChart.classList.add('active');
  
  quizIntro.classList.remove('active');
  navBar.classList.remove('active');

  // Lets grab the scores from the localstorate
  var scoresData = localStorage.getItem('score');

  // Check to see if the scoresData variable is filled.
  if (scoresData) {
    scoresData = JSON.parse(scoresData ? scoresData : "[]");
  
    scoresData.forEach(function(data) {
      
      var scoreItem = document.createElement('li');
      scoreItem.innerHTML = "<span class='name'>" + data.initials + "</span>";
      scoreItem.innerHTML += "<span class='score'>" + data.score + "</span>";
      chart.append(scoreItem);
      console.log(data);
    });
  }
}

function hideHighscoreChart() {
  highscoreChart.classList.remove('active');
  navBar.classList.add('active');
  quizIntro.classList.add('active');
  chart.innerHTML = '';
}

function clearHighscoreChart() {
  localStorage.removeItem('score');
  chart.innerHTML = '';
}

highscore.addEventListener('click', displayHighscoreChart);
backButton.addEventListener('click', hideHighscoreChart);
clearButton.addEventListener('click', clearHighscoreChart);

// Function to display the results page once the quiz has been completed

var completedScore = 0;

function completedQuiz(){

  // Lets show the results page
  completed.classList.add('active');

  // Lets get the score by pulling the remaing time and lets stop the timer.
  completedScore = timer.innerText;//Math.floor(secondsElapsed % 60);
  // Lets get the final unaswered question so we can penalise the user further.
  var penalty = parseInt(document.getElementsByClassName('unanswered').length);
  scoreDisplay.innerText = parseInt(completedScore) - penalty;

  stopTimer();
}

 // Lets log the results into the chart
 initialSubmitButton.addEventListener('click', function() {

  completed.classList.remove('active');

   // Check to see if there is a "score" data included.
  var data = localStorage.getItem('score');
  var storedScores = JSON.parse(data ? data : "[]");

  var newEntryData = {
    initials: initialValue.value,
    score: completedScore
  }

  storedScores.push(newEntryData);
  localStorage.setItem('score', JSON.stringify(storedScores));
  initialValue.value = "";
  completedScore = 0;

  displayHighscoreChart();

});



function buildQuiz(level=0, arrIndex = 0) {
  
  if (level) {
    var quizInfo = quizObj[arrIndex].options;
        quizInfo.push(quizObj[arrIndex].answer);
    var quizLength = quizInfo.length;
  } else {
    var quizInfo = quizObj;
    var quizLength = quizInfo.length;
  }

  quizInfo = shuffle(quizInfo);

  var quizTemplate = [];
  var clonedQuiz = [];

  //quizInfo


  for(var o=0;o<quizLength;o++) {

    if (level) {

      var template = document.getElementById('quiz-template-' + arrIndex),
      choices = template.getElementsByTagName('ul')[0],
      choiceItem = document.createElement('li');

      choiceItem.innerHTML = quizInfo[o];
      choices.append(choiceItem);

      choiceItem.addEventListener('click', function() {
        
        if (this.innerHTML === quizObj[arrIndex].answer) {

          /*
            User have selected the correct choice, lets move on to the next question
            
          */

          // Lets hide the currect question and remove unanswered class so we can tally any missed questions in the end.
          template.classList.remove('active');
          template.classList.remove('unanswered');

          // Lets check if there is another question in queue or complete the quiz.
          if (parseInt(arrIndex+1) < quizObj.length) {       
            var nextQuiz = document.getElementById('quiz-template-' + parseInt(arrIndex+1));
            nextQuiz.classList.add('active');
          }
          else {
            // This should have been the final question, so lets return the result.
            completedQuiz();
          }
        
        } else {

          // Let penalise the user for the wrong choice selected.
          secondsElapsed = parseInt(secondsElapsed) - 10;

          // Display the incorrect msg
          template.lastElementChild.innerHTML = "Incorrect!";
          template.lastElementChild.classList.add('highlight');

          // REemove the incorrect msg after a few seconds
          setTimeout(function() {
            template.lastElementChild.innerHTML = "";
            template.lastElementChild.classList.remove('highlight');
          }, 2000);

        }

      });


    } else {

      quizTemplate[o] = document.getElementById('quiz-template');
      clonedQuiz[o] = quizTemplate[o].cloneNode(true);

      // Lets prep the quiz with a unique ID so we can move onto the next one
      // Apply an unanswered class so we can use this at the end to tally any missed questions due to time running out.
      clonedQuiz[o].id = 'quiz-template-' + o;
      clonedQuiz[o].classList.add('unanswered');
      quizContainer.append(clonedQuiz[o]);
      
      // Lets put the question into the header template.
      var header = clonedQuiz[o].getElementsByTagName('h2')[0];
      header.innerHTML = quizInfo[o].question;

      buildQuiz(1, o);
    }
  }

}



function startQuiz() {

  startQuizButton.addEventListener('click', function() {

    startTimer();

    quizIntro.classList.remove('active');

    var quizBlocks = document.getElementsByClassName('quiz-block');

    quizBlocks[1].classList.add('active');

  });

}

buildQuiz();

startQuiz();
