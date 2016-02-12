var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'mc-template.html',
		link: function(scope, elem, attrs) {
			
			scope.lesson = "Lesson 16";

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
			question : "453 ÷ 8 = ?",
			options: ["56 r. 4", "55 r. 4", "56 r. 5", "55 r. 5"],
			answer: 2
		},
		{
			question : "984 ÷ 8 = ?",
			options: ["123", "120", "124", "125"],
			answer: 0
		},
		{
			question : "754 ÷ 5 = ?",
			options: ["151 r. 3", "155 r. 1", "143 r. 2", "150 r. 4"],
			answer: 3
		},
		{
			question : "390 ÷ 5 = ?",
			options: ["86", "67", "78", "83"],
			answer: 2
		},
		{
			question : "368 ÷ 6 = ?",
			options: ["61 r. 2", "61 r. 1", "60 r.5", "60 r. 3"],
			answer: 0
		},
		
		{
			question : "704 ÷ 2 = ?",
			options: ["353", "352", "350", "349"],
			answer: 1
		},
		{
			question : "967 ÷ 4 = ?",
			options: ["241", "240 r. 1", "241 r. 3", "242"],
			answer: 2
		},
		{
			question : "549 ÷ 9 = ?",
			options: ["59", "61", "64", "54"],
			answer: 1
		},
		{
			question : "845 ÷2 = ?",
			options: ["401 r. 1", "411", "417", "422r. 1"],
			answer: 3
		},
		{
			question : "788 ÷ 4 = ?",
			options: ["188", "198", "197", "179"],
			answer: 2
		},

		{
			question : "568 ÷ 8 = ?",
			options: ["84", "67", "71", "55"],
			answer: 2
		},
		{
			question : "129 ÷ 6 = ?",
			options: ["27", "21 r. 3", "29", "24 r. 1"],
			answer: 1
		},
		{
			question : "541 ÷ 3 = ?",
			options: ["180 r. 1", "167", "167 r. 2", " 184"],
			answer: 0
		},
		{
			question : "698 ÷ 7 = ?",
			options: ["100 r. 4", "94", "101", "99 r. 5"],
			answer: 3
		},
		{
			question : "865 ÷ 9 = ?",
			options: ["94", "92 r.5", "96 r. 1", " 99"],
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