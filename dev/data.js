// Questions files

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