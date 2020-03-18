// Lets create a the questions and answer

/*
var quizQnA = [
  {
    question: "test",
    answer: [
      "Option One",
      "Option Two",
      "Option Three"]
    },
  1 : {
    question: "test2",
    answer: [
    "Option One - 2",
    "Option Two - 2",
    "Option Three - 2"
    ]
  }

]
*/
//console.log(Map.prototype.size(quizQnA));

var quizQnA = [
  ["question 1", 
    [
      "answer", "alternative 1", "alternative 2", "alternative 3"
    ]
  ],
  ["question 2", 
    [
      "answer", "alternative 1", "alternative 2", "alternative 3"
    ]
  ],
  ["question 3", 
    [
      "answer", "alternative 1", "alternative 2", "alternative 3"
    ]
  ]
]

var quizContainer = document.getElementById("quiz");


for(q=0;q<quizQnA.length;q++) {

  var h2 = document.createElement('h2');
  h2.innerText = quizQnA[q][0];

  var ul = document.createElement('ul');

  h2.innerText = quizQnA[q][0];

  quizContainer.append(h2);
  quizContainer.append(ul);

  // Copy options into a new array so we can randomise it.
  
  var tempArr = quizQnA[q][1];//quizQnA
  var actualAns = tempArr[0];
  var length = quizQnA[q][1].length;
  var ans = quizQnA[q][1][0];

  for(o=0;o<length;o++) {
    
    console.log(length);

    var opt = document.createElement('li');

    // Lets grab a random option and delete from current array.
    var v = Math.floor(Math.random()*tempArr.length);
    var text = tempArr.splice(v,1);
    
    opt.innerText = text

    opt.addEventListener('click', function() {
      
      if (actualAns.indexOf(this.innerText) == 0) {
        console.log("Win");
      } else {
        console.log('Loose!');

      }
    });

    ul.append(opt);
  }
  

}

