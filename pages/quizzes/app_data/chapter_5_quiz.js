var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'mc-template.html',
		link: function(scope, elem, attrs) {
			
			scope.lesson = "Chapter 5";

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
					// send score to db
					$.post("sendtodb.php", {chapter: "ch5", score: scope.score});
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
			question : "Find the missing terms in the following number sequence: 1, _, 5, _, 9",
			options: ["3, 7", "3, 6", "4,8", "1, 3"],
			answer: 0
		},
		{
			question : "Find the missing terms in the following number sequence: _, 8, 12, _, 20",
			options: ["5, 7", "1, 3", "10, 8", "4, 16"],
			answer: 3
		},
		{
			question : "Find the missing terms in the following number sequence: _, -2, -3, _, -5",
			options: ["1, 0", "-1, -4", "6, 1", "2, 2"],
			answer: 1
		},
		{
			question : "Find the missing terms in the following number sequence: 10, _, 30, _, 50",
			options: ["2, 4", "3, 9", "20, 40", "50, 70"],
			answer: 2
		},
		{
			question : "Find the missing terms in the following number sequence: 1, _, 3, _, 5",
			options: ["2, 4", "9, 0", "2, 7", "6, 8"],
			answer: 0
		},
		{
			question : "Find the missing terms in the following number sequence: 12, _, 8, 6, _",
			options: ["10, 4", "8, 10", "6, 8", "10, 6"],
			answer: 0
		},
		{
			question : "Find the missing terms in the following number sequence: 15, _, 25, _, 35",
			options: ["15, 20", "25, 30", "20, 30", "10, 15"],
			answer: 2
		},
		{
			question : "Find the missing terms in the following number sequence: 1, 2, 3, _, 5",
			options: ["0, 2", "2, 3", "4, 5", "7, 8"],
			answer: 2
		},
		{
			question : "Find the missing terms in the following number sequence: 5, _, 9, 11, _",
			options: ["8, 10", "3, 4", "1, 9", "7, 13"],
			answer: 3
		},
		{
			question : "Find the missing terms in the following number sequence: 1, 3, _, 7, _",
			options: ["5, 9", "8, 7", "1, 4", "5, 10"],
			answer: 0
		},

		{
			question : "Identify the property to use: 2x ( 4 + 8 ) = (2 x 4 ) + (2 x8)",
			options: ["Distributive Property of Multiplication over Addition", 
						"Commutative Property and Associative Property"],
			answer: 0
		},
		{
			question : "Identify the property to use: 6+10 +12+24 = (10+ 12 ) + ( 6 + 24)",
			options: ["Distributive Property of Multiplication over Addition", 
						"Commutative Property and Associative Property"],
			answer: 1
		},
		{
			question : "Identify the property to use: (7x 1 ) + 0 = 7 x ( 1 +0)",
			options: ["Distributive Property of Multiplication over Addition", 
						"Commutative Property and Associative Property"],
			answer: 0
		},
		{
			question : "Identify the property to use: 12 x 15 = 12 x 15",
			options: ["Distributive Property of Multiplication over Addition", 
						"Commutative Property and Associative Property"],
			answer: 1
		},
		{
			question : "Identify the property to use: 460 + 240 = 460 + 240",
			options: ["Distributive Property of Multiplication over Addition", 
						"Commutative Property and Associative Property"],
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