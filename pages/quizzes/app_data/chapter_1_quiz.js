var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'mc-template.html',
		link: function(scope, elem, attrs) {
			
			scope.lesson = "Chapter 1";

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
		//lesson 2
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
		},
		//lesson 3
		{
			question: "Which number represents - Fifty-five thousand sixteen?",
			options: ["55 016", "54 016", "55 060", "55 160"],
			answer: 0
		},
		{
			question: "Which number represents - Sixty-seven thousand two hundred three?",
			options: ["67 230", "67 203", "60 230", "67 200"],
			answer: 1
		},
		{
			question: "Which number represents - Eighty-four thousand nine?",
			options: ["84 000", "80 000", "84 009", "90 009"],
			answer: 2
		},
		{
			question: "Which number represents - Fifty-seven thousand two?",
			options: ["57 000", "7 000", "50 000", "57 002"],
			answer: 3
		},
		{
			question: "Which number represents - One hundred thousand?",
			options: ["1 000", "100 000", "10 000", "10"],
			answer: 1
		},
		//lesson 4
		{
			question : "Round off 56 456 to the nearest ten thousands.",
			options: ["60 000", "70 000", "56 400", "56 000"],
			answer: 0
		},
		{
			question: "Round off 43 840 to the nearest hundreds.",
			options: ["43 800", "43 000", "44 000", "43 900"],
			answer: 0
		},
		{
			question: "Round off 14 500 to the nearest thousands.",
			options: ["13 500", "13 000", "14 000", "15 000"],
			answer: 3
		},
		{
			question: "Round off 98 600 to the nearest thousands.",
			options: ["90 000", "99 000", "98 500", "90 600"],
			answer: 1
		},
		{
			question: "Round off 56 986 to the nearest ten thousands.",
			options: ["50 000", "60 000", "70 000", "80 000"],
			answer: 1
		},

		//lesson 5
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
		},

		//lesson 6
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