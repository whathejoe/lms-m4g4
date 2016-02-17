var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'mc-template.html',
		link: function(scope, elem, attrs) {
			
			scope.lesson = "Chapter 3";

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
			question : "Which number is prime?",
			options: ["12", "6", "9", "7"],
			answer: 3
		},
		{
			question : "Which number is composite?",
			options: ["21", "2", "13", "11"],
			answer: 0
		},
		{
			question : "Which number is prime?",
			options: ["27", "31", "1", "39"],
			answer: 1
		},
		{
			question : "Which number is composite?",
			options: ["1", "57", "17", "41"],
			answer: 2
		},
		{
			question : "Which number is prime?",
			options: ["64", "10", "17", "45"],
			answer: 2
		},

		{
			question : "What is the GCF of 24 and 16?",
			options: ["6", "8", "2", "4"],
			answer: 3
		},
		{
			question : "What is the GCF of 70 and 49?",
			options: ["2", "7", "10", "3"],
			answer: 1
		},
		{
			question : "What is the GCF of 44 and 11?",
			options: ["11", "2", "4"],
			answer: 0
		},
		{
			question : "What is the GCF of 21 and 49?",
			options: ["7", "9", "6", "3"],
			answer: 0
		},
		{
			question : "What is the GCF of 56 and 24?",
			options: ["11", "3", "8", "9"],
			answer: 2
		},
		{
			question : "What is the GCF of 35 and 25?",
			options: ["6", "5", "3", "7"],
			answer: 1
		},
		{
			question : "What is the GCF of 24 and 20?",
			options: ["6", "3", "4", "2"],
			answer: 2
		},
		{
			question : "What is the GCF of 25 and 35?",
			options: ["7", "5", "3", "4"],
			answer: 1
		},
		{
			question : "What is the GCF of 54 and 81?",
			options: ["11", "9", "27", "3"],
			answer: 2
		},
		{
			question : "What is the GCF of 15 and 40?",
			options: ["3", "1", "5", "8"],
			answer: 2
		},

		{
			question : "Find the LCM for 3 and 11.",
			options: ["22", "11", "33", "44"],
			answer: 2
		},
		{
			question : "Find the LCM for 8 and 10.",
			options: ["32", "40", "20", "60"],
			answer: 1
		},
		{
			question : "Find the LCM for 6, 18 and 36.",
			options: ["6", "18", "36", "108"],
			answer: 2
		},
		{
			question : "Find the LCM for 4 and 12.",
			options: ["48", "36", "12", "8"],
			answer: 2
		},
		{
			question : "Find the LCM for 2, 5 and 7.",
			options: ["20", "70", "45", "35"],
			answer: 1
		},
		{
			question : "Find the LCM for 12 and 15.",
			options: ["60", "30", "5", "180"],
			answer: 0
		},

		{
			question : "Identify 5/3 as a proper or improper fraction.",
			options: ["Proper", "Improper"],
			answer: 1
		},
		{
			question : "Change 12/5 from an improper fraction to mixed number.",
			options: ["12 0/5", "2 2/5", "5 2/2", "2 5/2"],
			answer: 1
		},
		{
			question : "Change 3 5/6 from a mixed number to an improper fraction.",
			options: ["20/6", "35/6", "23/6", "6/23"],
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