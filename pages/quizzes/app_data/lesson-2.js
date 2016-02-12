var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'mc-template.html',
		link: function(scope, elem, attrs) {
			
			scope.lesson = "Lesson 2";

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
			question: "Solve the following equation. 50 000 + 2 000 + 400 + 70 + 2",
			options: ["52 472", "52 742", "50 472", "50 742"],
			answer: 0
		},
		{
			question: "Solve the following equation. 90 000 + 1000 + 700 + 0",
			options : ["90 100", "90 700", "91 100", "91 700"],
			answer: 3
		},
		{
			question: "Solve the following equation. 80 000 + 500 + 20 + 4",
			options: ["85 204", "80 524", "85 542", "50 267"],
			answer: 1
		},
		{
			question: "Solve the following equation. 20 000 + 3 000 + 400 + 10 + 3",
			options: ["23 413", "23 400", "20 410", "20 000"],
			answer: 0
		},
		{
			question: "Solve the following equation. 100 000 + 30 000 + 4 000 + 100 + 40 + 3",
			options: ["130 143", "130 000", "134 143", "100 300"],
			answer: 2
		},
		{
			question: "Select the value of the digit between ( and ). 7(8) 426",
			options: ["8 000", "80 000", "800 000", "8"],
			answer: 0
		},
		{
			question: "Select the value of the digit between ( and ). (1)00 010",
			options: ["10 000", "100 000", "1 000", "100"],
			answer: 1
		},
		{
			question: "Select the value of the digit between ( and ). 49 (6)73",
			options: ["6 000", "9 000", "90 000", "600"],
			answer: 3
		},
		{
			question: "Select the value of the digit between ( and ). (8)6 594",
			options: ["6 000", "80 000", "8", "800"],
			answer: 1
		},
		{
			question: "Select the value of the digit between ( and ). 97 4(2)8",
			options: [ "200", "20", "7 000", "400"],
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