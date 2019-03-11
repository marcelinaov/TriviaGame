$(document).ready(function(){
  
    
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    
    questions: {
      q1: "Who is Harry Potter’s godfather?",
      q2: "What words prompt the Marauder's Map to show itself?",
      q3: "What shape does Harry's Patronus take?",
      q4: "What did the Boggart turn into while facing Professor Lupin?",
      q5: "Who was, in fact, responsible for alerting Voldemort about Harry's parents' whereabouts?",
      q6: "What must Harry do in secret while at four Privet Drive?",
      q7: "What does Harry see each time before he find himself in danger?",
    },
    options: {
      q1: ["Severus Snape", "Albus Dumbledore", "Sirius BlackDoe"],
      q2: ["Alahamora", "I solemnly swear taht I am up to no good", "Open sasame"],
      q3: ["A hippogriff", "A otter", "A stag"],
      q4: ["Full moon", "Crystal ball", "Mirror"],
      q5: ["Hagrid", "Peter Pettigrew", "Snape"],
      q6: ["His homework", "Quidditch exercises", "Talk to dobby"],
      q7: ["Voldemort", "A large dog", "Crookshanks"]
    },
    answers: {
      q1: "Sirius BlackDoe",
      q2: "I solemnly swear taht I am up to no good",
      q3: "A stag",
      q4: "Full moon",
      q5: "Peter Pettigrew",
      q6: "His homework",
      q7: "A large dog"
    },
    
    
    startGame: function(){
      
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      
      $('#game').show();
      
      
      $('#results').html('');
      
      
      $('#timer').text(trivia.timer);
      
     
      $('#start').hide();
  
      $('#remaining-time').show();
      
     
      trivia.nextQuestion();
      
    },
     
    nextQuestion : function(){
      
      
      trivia.timer = 12;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    
    timerRunning : function(){
      
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
   
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
       
        $('#game').hide();
        
        
        $('#start').show();
      }
      
    },
    
    guessChecker : function() {
      
      
      var resultId;
      
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      
      if($(this).text() === currentAnswer){
        
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      
      else{
        
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    
    guessResult : function(){
      
      
      trivia.currentSet++;
      
      
      $('.option').remove();
      $('#results h3').remove();
      
      
      trivia.nextQuestion();
       
    }
  
  }