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
		},

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
		},

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
		},

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
		},

		{
			question : "What is the remainder when 6567 is divided by 27?",
			options: ["264 r. 13", "243 r. 6", "251", "263"],
			answer: 0
		},
		{
			question : "A farmer planted 1680 pineapples equally in 24 rows. How many pineapples were planted in each row?",
			options: ["180", "240", "160", "210"],
			answer: 2
		},
		{
			question : "Hazel, Cha, and Marimar shared the amount of Php480 to buy a birthday gift for their teacher. How much did each of them share?",
			options: ["120", "160", "180", "140"],
			answer: 1
		},
		{
			question : "A farmer gathered 760 mangoes from his farm. He placed 60 mangoes in each basket and sold them. How many mangoes were not in a full basket?",
			options: ["20", "30", "40", "50"],
			answer: 3
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