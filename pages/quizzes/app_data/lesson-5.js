var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'mc-template.html',
		link: function(scope, elem, attrs) {
			
			scope.lesson = "Lesson 5";

			scope.start = function() {
				scope.id = 0;
				scope.items = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
					scope.items++;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question : "There were 30 123 people at the PBA Championship Games at the Arena Coliseum on Friday and 32 450 people on Sunday. On which day were there more people?",
			options: ["Monday", "Sunday", "Saturday", "Friday"],
			answer: 1
		},
		{
			question: "At a certain game show contestant A won Php40, 000 while contestant B won Php50, 000. Who won the lesser amount of money?",
			options: ["Contestant A", "Contestant B", "Contestant C", "Contestant D"],
			answer: 0
		},
		{
			question: "Which number is greater than 99 990?",
			options: ["100 000", "90 000", "80 000", "70 000"],
			answer: 0
		},
		{
			question: "Which number is less than 80 009?",
			options: ["80 100", "90 300", "79 009", "80 010"],
			answer: 2
		},
		{
			question: "Which number is greater than 90 890?",
			options: ["90 889", "90 790", "90 700", "90 900"],
			answer: 3
		}
	];

	questions =  shuffleArray(questions);

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}