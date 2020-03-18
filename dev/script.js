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

// Lets load the data which includes the questions and answers.

// Lets build the quiz.
// First we need to build the following 

function $(param){

  srcParam = '_' + param;
  param = param.slice(1);

  if (srcParam.indexOf('#'))   {
    return document.getElementById(param);
  } 
  else if (srcParam.indexOf('.')) {
    return document.getElementsByClassName(param);
  } 
  else if (srcParam.indexOf('<')) {
    return document.getElementsByTagName(param);
  }

  return;
}

// Lets set the basic variables.
var totalSeconds   = 0,
    secondsElapsed = 0,
    unanswered = 0,
    currentSession,
    interval;

function setTime() {
  secondsElapsed = totalSeconds;
  interval = setInterval(runTimer, 1000);
}

function runTimer() {
  secondsElapsed--;

  // Calcuate the minutes and seconds and push to the browser
  var minutes = Math.floor(secondsElapsed / 60);
  var seconds = Math.floor(secondsElapsed % 60);

  $('#timer-minutes').innerText = minutes ? minutes + ':' : '';
  $('#timer-seconds').innerText = seconds;
  
  // Should timer reach zero or below lets stop the quiz.
  if(secondsElapsed <= 0) {

    stopTimer();
    // Display popup message when time runs out.
    popUpMsg("Times up!");

    // Make sure all the remaing quiz block are destory and calculate for finally tally.
    remaingQuiz = document.getElementsByClassName('quiz-block');
    
    if (remaingQuiz) {
      unanswered = remaingQuiz.length;
      for(i=0;i<remaingQuiz.length;i++){
        remaingQuiz[i].remove();
      }
    }

    // Reset HTML timer
    $('#timer-minutes').innerText = '';
    $('#timer-seconds').innerText = '00';

    // Display the result block
    showResult();
      
  }
}

// A stop timer function
function stopTimer() {
  clearInterval(interval);
}

// A start quiz timer function
function startTimer() {
  totalSeconds = quizObj.length * 10;
  clearInterval(interval);  
  setTime();
}

// A restart timer function when quiz is paused
function restartTimer() {
  interval = setInterval(runTimer, 1000);
}

// A function to start the quiz when "start button is click"
function startQuiz() {

  $('#welcome-block').classList.remove('active');
  localStorage.removeItem('session');
  startTimer();
  buildQuiz();
  
}

// Create a pop message for game info
function popUpMsg(msg, type = 'alert') {

  var popUpBox = document.createElement('div'),
      popUpMsg = document.createElement('p');
      
  $('#container').append(popUpBox);

  popUpBox.append(popUpMsg);

  popUpBox.id = 'popup-box';
  popUpBox.classList.add(type);
  popUpMsg.innerText = msg;

  if (type != 'warning' ) {
    setTimeout(function() {
      popUpBox.remove();
    }, 2000);
  }
}

// Build the goback function as it is used multiple times.
function goBack() {

  $('#view-highscore').classList.add('active');
  $('#view-go-home').classList.remove('active');

  // Check to see if we are returning from an active quiz or from the results block.
  if (localStorage.getItem('session') == 'active') {
    currentSession.classList.add('active');
    currentSession = '';
    // Remove paused message
    $('#popup-box').remove();
    // Display popup message, arg=msg, arg2=type of msg
    popUpMsg('Your quiz has resumed!', 'advice');
    restartTimer();
  } else {
    $('#welcome-block').classList.add('active');
  }

  $('#highscore-chart-block').remove();

}

// Build the clearchart function for easy call back.
function clearChart() {
  localStorage.removeItem('results');
  $('#highscore-chart').innerHTML = '';
}


// Lets display the current top ten highscores currently stored.
function displayHighscoreChart() {

  // Check if user is currently active doing the question.

  if (localStorage.getItem('session') == 'active') {
    currentSession = document.getElementsByClassName('quiz-block active')[0];
    currentSession.classList.remove('active');
    
    // Stop timer while the quiz is paused
    // Lets also display a message
    stopTimer();
    // Display popup message, arg = msg, arg2 = type of msg
    popUpMsg('Your quiz has been paused!', 'warning');
  }

  // Build the elemnt blocks for highscore chart
  var chartBlock    = document.createElement('div'),
      header        = document.createElement('h2'),
      chart         = document.createElement('ol'),
      back          = document.createElement('button'),
      clear         = document.createElement('button');
      
  // Add elements to the brower    
  $('#container').append(chartBlock);

  chartBlock.append(header);
  chartBlock.append(chart);
  chartBlock.append(back);
  chartBlock.append(clear);

  // Apply the information to display the highscore block
  chartBlock.id = 'highscore-chart-block';
  chart.id      = 'highscore-chart';
  chartBlock.classList.add('active');
  header.innerText = 'Highscores';
  back.innerText   = '< Go Back';
  clear.classList.add('right');
  clear.innerText  = 'Clear Chart';

  // Lets grab the results from the localStorage
  var resultsData   = localStorage.getItem('results');
  var lastEntryData = localStorage.getItem('lastEntry');

  // Check to see if the scoresData variable is filled.
  if (resultsData) {
    resultsData = JSON.parse(resultsData ? resultsData : '[]');
    lastEntryData = JSON.parse(lastEntryData ? lastEntryData : '[]');
  
    // Build and display results into a list. 
    resultsData.forEach(function(data) {
      
      var item = document.createElement('li');
      item.innerHTML  = '<span class="name">' + data.initials + "</span>";
      item.innerHTML += '<span class="score">' + data.result + "</span>";
      chart.append(item);

    });

    //console.log(lastEntryData);
  }

  back.addEventListener('click', goBack);
  clear.addEventListener('click', clearChart);

  $('#view-highscore').classList.remove('active');
  $('#welcome-block').classList.remove('active');
  $('#view-go-home').classList.add('active');
  $('#view-go-home').addEventListener('click', goBack);

}

// Display the result block
function showResult() {

  // Lets clear the quiz session
  localStorage.removeItem('session');
  currentSession = '';

  // Build the element blocks needed to display the results
  var resultBlock   = document.createElement('div'),
      header        = document.createElement('h2'),
      text          = document.createElement('p'),
      input         = document.createElement('input'),
      button        = document.createElement('button');
      
  // Add new alements into the browser
  $('#container').append(resultBlock);
  
  resultBlock.append(header);
  resultBlock.append(text);
  resultBlock.append(input);
  resultBlock.append(button);

  // Check the remaing seconds to add to the results data.
  var result = secondsElapsed;

  // Lets apply additional penalty for every question unaswered.
  result = result - unanswered;
  // Clear the unanswered for future use.
  unanswered = 0;

  // Apply the information need to complete display
  resultBlock.classList.add('active');
  header.innerText  = 'All Done!';
  text.innerText    = 'Your final score is: ' + result;
  input.placeholder = 'Type your initials here';
  button.innerText  = 'Submit';

  // Add the click event so we can store user result and move onto the highscore cart.
  button.addEventListener('click', function(){

    // Lets check to see if there is any existing results.
    var data = localStorage.getItem('results');
    var resultsData = JSON.parse(data ? data : '[]');

    // Build the new entry
    var newEntryData = {
      initials: input.value,
      result: result
    }

    // Push and sort data so the first ten results are added for display in the highscore cart
    resultsData.push(newEntryData);
    resultsData.sort((a, b) => (a.result > b.result) ? -1: 1);
    resultsData.slice(10);
    localStorage.setItem('results', JSON.stringify(resultsData));
    localStorage.setItem('lastEntry', JSON.stringify(newEntryData))

    // Finally clear the result block
    this.parentElement.remove();
    //  and display highscore chart.
    displayHighscoreChart();

  });

  stopTimer();

}

// A simple quiz tempalte so we do not have to repeat the process.
function quizTemplate() {

  var qBlock   = document.createElement('div'),
      header   = document.createElement('h2'),
      options  = document.createElement('ul');

      
  $('#container').append(qBlock);
  
  qBlock.append(header);
  qBlock.append(options);

  // Apply a class for basic stylings
  qBlock.classList.add('quiz-block');

  // Return the basic element blocks
  return { body: qBlock, header: header, options: options };

}

// Let build a question checker to ensure the user has selected the correct or incorrect answer.
function choiceChecker() {

  // Grab the current question block
  var thisQuestion = this.parentElement.parentElement;

  // Lets determind if the choice selected is correct.
  if (this.innerHTML === this.getAttribute('data-answer')) {
    
    // Grab the next question store in [data-next]
    var nextBlock = $('#' + thisQuestion.getAttribute('data-next'));

    // Lets remove current quiz block before moving onto the next
    thisQuestion.remove();
    if (nextBlock) {
      // Check to see if there is another question
      nextBlock.classList.add('active');
    }
    else {
      // No more questions, lets return the results.
      showResult();
    }
    
    //$('#' + this.getAttribute('data-next')).classList.add('active');
  }
  else {
    secondsElapsed = secondsElapsed - 10;
    popUpMsg('Wrong answer!');
  }
}

// Let build the quiz blocks and let the the best quiz master win!
function buildQuiz() {

  var quizArray = shuffle(quizObj);

  quizArray.forEach(function(quiz, index) {

    localStorage.setItem('session', 'active');
  
    // Build the quiz template
    var template = quizTemplate();
    template.body.id = 'quiz-block-' + index;
    template.body.setAttribute('data-next', 'quiz-block-' + (index+1));
    template.header.innerHTML = quiz.question;

    if (!index) {
      // Lets show just the first quiz block
      template.body.classList.add('active');
    }
    // Lets grab all the choices, and include the answer into an array.
    var choices = quiz.options;
    
    if (choices.indexOf(quiz.answer) == -1) {
      choices.push(quiz.answer);
    }
    
    choices = shuffle(choices);

    // Run through all the options available
    choices.forEach(function(data, index) {

      var choice = document.createElement('li');
      choice.innerHTML = data;
      // Lets store the answer using [data] value
      choice.setAttribute('data-answer', quiz.answer);
      template.options.append(choice);

      choice.addEventListener('click', choiceChecker);

    });

  });

}

// Let get the quiz started!
localStorage.removeItem('session');
$('#start-button').addEventListener('click', startQuiz);
$('#view-highscore').addEventListener('click', displayHighscoreChart);