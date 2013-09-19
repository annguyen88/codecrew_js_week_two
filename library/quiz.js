(function(jQuery){
    var $ = jQuery;

    var Quiz = function(questions, selector, outputMethod) {
        return this.initialize(questions, selector, outputMethod);
    };

    Quiz.prototype = {
        constructor : Quiz,
        questions : [],
        answers : [],
        body : function() {
            return $('#quiz');
        },
        initialize : function() {
            var selector = arguments[1];
            if (typeof selector != 'undefined') {
                this.body = function() {
                    return $(selector);
                }
            }
            if (typeof arguments[2] != 'undefined') {
                this.output = arguments[2];
            }
            this.questions = arguments[0];
            return this.initQuiz();
        },
        getQuestion : function(index) {
            var question = this.questions[index];
            var ul = $('<ul/>', {
                'class' : 'question-choices'
            });
            for(var j = 0; j < question.choices.length; j++) {
                var input = $('<input/>',
                    {
                        'class' : 'input-class',
                        'question-index' : index,
                        type : 'radio',
                        name : 'question',
                        value : j
                    }
                );
                var li = $('<li/>');
                li.append(input);
                var span = $('<span/>', {
                    html : question.choices[j],
                    'class' : 'choice-text'
                });
                li.append(span);
                ul.append(li);
            }
            return ul;
        },
        initQuiz : function() {
            this.currentQuestionIndex = 0;
            this.renderQuestion();
        },
        renderQuestion : function() {
            var i = this.currentQuestionIndex;
            if (typeof this.questions[i] == 'undefined') {
                this.endQuiz();
                return null;
            }
            var title = '<h2>' + this.questions[this.currentQuestionIndex].question + '</h2>';
            this.body().html('').append(title).append(this.attachAnswerListener(this.getQuestion(i)));
            return this;
        },
        attachAnswerListener : function(question) {
            question = $(question);
            var giraffe = this;
            question.find('input').click(function() {
                var questionIndex = $(this).attr('question-index'),
                    response = $(this).attr('value');
                giraffe.answers[questionIndex] = response;
                giraffe.body().html('');
                giraffe.currentQuestionIndex++;
                giraffe.renderQuestion();
            });
            return question;
        },
        endQuiz : function() {
            this.output('end of quiz');
            this.gradeQuiz();
        },
        gradeQuiz : function() {
            var score = 0;
            for (var i = 0; i < this.questions.length; i++) {
                if (this.answers[i] == this.questions[i].correctAnswer) {
                    score++;
                }
            }
            this.output('Your score was ' + score);
        },
        output : function() {
            alert(arguments[0]);
        }
    };

    $(document).ready(function() {
        var allQuestions = [
            {
                question: "Who is Prime Minister of the United Kingdom?",
                choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],
                correctAnswer: 0
            },
            {
                question: "What is the Capitol of The United States?",
                choices: ["Albany", "Philly", "NYC", "DC"],
                correctAnswer: 3
            }
        ];
        // alternate call
        // var quiz = new Quiz(allQuestions, '#quiz', function(msg) {$('.message').html(msg)});

        // basic call
        new Quiz(allQuestions);
    });
})(typeof $ == 'function' && typeof $().jquery == 'string' ? $ : jQuery);