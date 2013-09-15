

$(document).ready(function() {

  var allQuestions = [
    {
      question: "Who is Prime Minister of the United Kingdom?",
      choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
      correctAnswer: 0
    },
    {
      question: "What is the capitol of the United States?",
      choices: ["Albany", "Philly", "NYC", "DC"],
      correctAnswer: 3
    }
  ];

  for(var i = 0; i < allQuestions.length; i++) {
    alert(allQuestions[i].question + allQuestions[i].choices[allQuestions[i].correctAnswer]);
  }



  


});