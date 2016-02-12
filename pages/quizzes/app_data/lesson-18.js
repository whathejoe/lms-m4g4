var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'mc-template.html',
		link: function(scope, elem, attrs) {
			
			scope.lesson = "Lesson 18";

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
			question : "How many 10s are there in 5520?",
			options: ["525", "255", "500", "552"],
			answer: 3
		},
		{
			question : "How many 100s are there in 1100?",
			options: ["9", "11", "8", "10"],
			answer: 1
		},
		{
			question : "How many 1000s are there in 39 000?",
			options: ["37", "39", "33", "29"],
			answer: 1
		},
		{
			question : "How many 100-peso bills will you need to change a 1000-peso bill?",
			options: ["1000", "1", "100", "10"],
			answer: 3
		},
		{
			question : "The pencil factory has rush orders from 10 stores. The factory has a stock of 55 000 pencils. If the stores will be given equal number of pencils, how many pencils will each store get?",
			options: ["5500", "5050", "5005", "550"],
			answer: 0
		},

		{
			question : "If a pair of slippers costs Php100, how many pairs of slippers can one buy with Php800?",
			options: ["10", "4", "8", "12"],
			answer: 2
		},
		{
			question : "I want to change my two 1000-peso bills to 25 pieces of 20 peso bills and the rest will be 100-peso bills. How many 100-peso bills will I have?",
			options: ["10", "5", "15", "3"],
			answer: 1
		},
		{
			question : "How many 10-peso bills will make Php 1,000,000?",
			options: ["100", "1 000", "10 000", "100 000"],
			answer: 3
		},
		{
			question : "How many 100-peso bills will make Php 1,000,000?",
			options: ["100", "1 000", "10 000", "100 000"],
			answer: 2
		},
		{
			question : "How many 1000-peso bills will make Php 1,000,000?",
			options: ["100", "1 000", "10 000", "100 000"],
			answer: 1
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