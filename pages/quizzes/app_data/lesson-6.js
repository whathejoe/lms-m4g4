var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'mc-template.html',
		link: function(scope, elem, attrs) {
			
			scope.lesson = "Lesson 6";

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
			question : "A municipality is implanting a tree-planting activity, It has 4 678 Narra seedlings. 12 794 Mahogany seedlings, and 14 067 Acacia seedling. Arrange the number of seedlings in increasing order.",
			options: ["14 067, 12 794, 4 678", "4 678, 12 794, 14 067", "12 794, 4 678, 14 067", "4 678, 14 067, 12 794"],
			answer: 1
		},
		{
			question : "A subdivision has some residential lots available for sale. The lots measure 1250 square meters, 2560 square meters, 2400 square meters, and 3480 square meters. Arrange the numbers in decreasing order.",
			options: ["3480, 2560, 2400, 1250", "1250, 2400, 2560, 3480", "2400, 2560, 3480, 1250", "2560, 3480, 1250, 2400"],
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