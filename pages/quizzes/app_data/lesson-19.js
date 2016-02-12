var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'mc-template.html',
		link: function(scope, elem, attrs) {
			
			scope.lesson = "Lesson 19";

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
			question : "Answer the following: 148 ÷ 10 =?, 148 ÷ 100 = ?",
			options: ["81 r. 4, 8 r. 14", "14 r. 8, 1 r. 48"],
			answer: 1
		},
		{
			question : "Answer the following: 2763 ÷ 10 =?, 2763 ÷ 100 = ?",
			options: ["276 r. 3, 27 r. 63", "273 r. 6, 27 r. 36"],
			answer: 0
		},
		{
			question : "Answer the following: 4389 ÷ 10 =?, 4389 ÷ 100 = ?",
			options: ["483 r. 9, 48 r. 39", "438 r. 9	43 r. 89"],
			answer: 1
		},
		{
			question : "Answer the following: 3847 ÷ 10 =?, 3847 ÷ 100 = ?",
			options: ["384 r. 7, 38 r. 47", "384 r. 7, 8 r. 47"],
			answer: 1
		},
		{
			question : "Answer the following: 376 ÷ 10 =?, 376 ÷ 100 = ?",
			options: ["37 r. 6, 3 r. 76", "33 r. 6, 3 r. 36"],
			answer: 0
		},

		{
			question : "Mrs. Malonzo withdrew Php9, 850 from a bank. The cashier gave the money in Php1,000-bills, Php100-bills and the rest in coins. How much money was given in coins?",
			options: ["9 000", "800", "500", "50"],
			answer: 3
		},
		{
			question : "If the divisor is 1000 and the quotient is 2 with a remainder of 346, what is the dividend?",
			options: ["346", "2 346", "1 346", "2 134"],
			answer: 1
		},
		{
			question : "The dividend is 3675 and the quotient is 367 with a remainder of 5. What is the divisor?",
			options: ["10", "100", "1", "1 000"],
			answer: 0
		},
		{
			question : "How many 1000-peso bills will there be in Php98,750? How much will the remainder be?",
			options: ["9 r. 875", "97 r. 85", "98 r. 75", "987 r. 5"],
			answer: 2
		},
		{
			question : "Mr. San Miguel has Php 33, 457. He wants to give it to the orphans in one of the many orphanages in the country. How much will each child receive if he decides to give it to 100 orphans? How much money will be left?",
			options: ["Php 3 each, Php 3 457 left", "Php 3 345 each, Php 7 left", "Php 334 each, Php 57 left", "Php 33 each, Php 357 left"],
			answer: 2
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