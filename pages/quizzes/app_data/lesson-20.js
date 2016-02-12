var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'mc-template.html',
		link: function(scope, elem, attrs) {
			
			scope.lesson = "Lesson 20";

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
			question : "367 ÷ 7 is :",
			options: ["less than 50", "greater than 50"],
			answer: 1
		},
		{
			question : "1920 ÷ 6 is :",
			options: ["less than 300", "greater than 300"],
			answer: 1
		},
		{
			question : "3473 ÷ 5 is :",
			options: ["less than 400", "greater than 400"],
			answer: 1
		},
		{
			question : "2040 ÷ 5 is :",
			options: ["less than 300", "greater than 300"],
			answer: 1
		},
		{
			question : "6575 ÷ 8 is :",
			options: ["less than 800", "greater than 800"],
			answer: 1
		},

		{
			question : "Which is a better buy, one box of 6 pencils at Php27 or one pencil at Php5 each?",
			options: ["one box of 6 pencils at Php 27", "one pencil at Php 5 each"],
			answer: 0
		},
		{
			question : "Which is a better buy, one kilogram of powdered detergent at Php280 or 6 small packs of 54 grams each of the same detergent at Php94?",
			options: ["one kilogram of powdered detergent at Php 280", "6 small packs of 54 grams each of the same detergent at Php 94"],
			answer: 0
		},
		{
			question : "If a kilogram of siniguelas costs Php 60, about how many kilograms can you buy with Php 200?",
			options: ["3 kilos", "5 kilos"],
			answer: 0
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