var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'mc-template-pic.html',
		link: function(scope, elem, attrs) {
			
			scope.lesson = "Chapter 6";

			scope.start = function() {
				scope.id = 0;
				scope.items = 0;
				scope.maxItems = 8;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.chime = document.getElementById('correct');
				scope.buzz = document.getElementById('wrong');
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q && scope.items < scope.maxItems) {
					if (q.img) {
						scope.image = q.img;
					} else {
						scope.image = null;
					}
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
					scope.items++;
				} else {
					scope.quizOver = true;
					// send score to db
					$.post("sendtodb.php", {chapter: "ch6", score: scope.score});
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.chime.play();
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.buzz.play();
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
			img: "ch_6_1.png",
			question : "How long does it take to go from North Avenue to Cubao?",
			options: ["5 minutes", "6 minutes", "11 minutes", " 15 minutes", "17 minutes"],
			answer: 0
		},
		{
			img: "ch_6_1.png",
			question : "How long does it take to go from North Avenue to Ortigas?",
			options: ["5 minutes", "6 minutes", "11 minutes", " 15 minutes", "17 minutes"],
			answer: 1
		},
		{
			img: "ch_6_1.png",
			question : "How long does it take to go from North Avenue to Guadalupe?",
			options: ["5 minutes", "6 minutes", "11 minutes", " 15 minutes", "17 minutes"],
			answer: 2
		},
		{
			img: "ch_6_1.png",
			question : "How long does it take to go from North Avenue to Ayala?",
			options: ["5 minutes", "6 minutes", "11 minutes", " 15 minutes", "17 minutes"],
			answer: 3
		},
		{
			img: "ch_6_1.png",
			question : "How long does it take to go from North Avenue to Taft Avenue?",
			options: ["5 minutes", "6 minutes", "11 minutes", " 15 minutes", "17 minutes"],
			answer: 4
		},

		{
			question : "John wakes up at 5:30 am so that he will have time to prepare himself for school . At 6:10 am , he is ready to go to school.  How long does it take him to prepare for school?",
			options: ["It takes 40 minutes for John to prepare.", 
						"It takes 20 minutes for John to prepare.", 
						"John wakes up at 5:30 am.", 
						"John prepares for school from 5:30 to 6:10 am."],
			answer: 0
		},

		{
			img: "ch_6_2.png",
			question : "What is the perimeter of the figure?",
			options: ["42 cm", "43 cm", "44 cm", "45 cm"],
			answer: 2
		},
		{
			img: "ch_6_3.png",
			question : "What is the perimeter of the figure?",
			options: ["8 m", "16 m", "32 m", "40 m"],
			answer: 1
		},
		{
			img: "ch_6_4.png",
			question : "What is the perimeter of the figure?",
			options: ["5 m", "15 m", "10 m", "20 m"],
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

$(function() {
	$(window).on('beforeunload', function() {
		var ongoing = $('div.over').hasClass('ng-hide');
		if (ongoing) {
		  	return 'Your quiz has not yet been finished. Grades will not be recorded unless you finish the quiz.';
		}
	});
});