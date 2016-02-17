var app = angular.module('quizApp', []);

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'mc-template.html',
		link: function(scope, elem, attrs) {
			
			scope.lesson = "Chapter 4";

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
					$.post("sendtodb.php", {chapter: "ch6", score: scope.score});
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
			question : "What do you call lines that intersect?",
			options: ["Parallel lines", "Perpendicular lines", "Instersecting lines", "Lines"],
			answer: 2
		},
		{
			question : "What do you call lines that do not meet at any point?",
			options: ["Parallel lines", "Perpendicular lines", "Instersecting lines", "Lines"],
			answer: 0
		},
		{
			question : "What do you call lines that intersect in a special way forming square corners?",
			options: ["Parallel lines", "Perpendicular lines", "Instersecting lines", "Lines"],
			answer: 1
		},

		{
			question : "What kind of angle is larger than the angle represented in the letter 'L'?",
			options: ["Acute angle", "Obtuse angle", "Right angle", "Full angle"],
			answer: 1
		},
		{
			question : "What kind of angle is represented in the letter 'L'?",
			options: ["Acute angle", "Obtuse angle", "Right angle", "Full angle"],
			answer: 2
		},
		{
			question : "What do you call the point where two rays start from to form an angle?",
			options: ["Vertex", "Angle", "Ray", "Point"],
			answer: 0
		},
		{
			question : "What kind of angle measures more than 90° but less than 180°?",
			options: ["Acute angle", "Obtuse angle", "Right angle", "Full angle"],
			answer: 1
		},
		{
			question : "What kind of angle measures 90°?",
			options: ["Acute angle", "Obtuse angle", "Right angle", "Full angle"],
			answer: 2
		},
		{
			question : "What kind of angle measures less than 90°?",
			options: ["Acute angle", "Obtuse angle", "Right angle", "Full angle"],
			answer: 0
		},
		{
			question : "What is the unit of measure of an angle?",
			options: ["Fahrenheit", "Degrees", "Line", "Vertex"],
			answer: 1
		},

		{
			question : "What do you call a polygon with 3 sides and 3 angles?",
			options: ["Triangle", "Quadrilateral", "Octagon", "Hexagon"],
			answer: 0
		},
		{
			question : "What do you call a closed figure made up of several line segments that are joined together?",
			options: ["Line segment", "Angle", "Ray", "Polygon"],
			answer: 3
		},
		{
			question : "What do you call two points that is connected by a straight line?",
			options: ["Line segment", "Angle", "Ray", "Polygon"],
			answer: 0
		},
		{
			question : "What do you call a polygon with 4 sides and 4 angles?",
			options: ["Triangle", "Quadrilateral", "Octagon", "Hexagon"],
			answer: 1
		},

		{
			question : "How many equal sides does an isosceles triangle have?",
			options: ["2", "3", "4", "5"],
			answer: 0
		},
		{
			question : "How many equal sides does an equilateral triangle have?",
			options: ["2", "3", "4", "5"],
			answer: 1
		},
		{
			question : "What kind of angle does an acute triangle have?",
			options: ["Acute angle", "Obtuse angle", "Right angle", "Full angle"],
			answer: 0
		},
		{
			question : "What kind of angle does a right triangle have?",
			options: ["Acute angle", "Obtuse angle", "Right angle", "Full angle"],
			answer: 2
		},
		{
			question : "What kind of angle does an obtuse triangle have?",
			options: ["Acute angle", "Obtuse angle", "Right angle", "Full angle"],
			answer: 1
		},
		{
			question : "What kind of triangle has 3 equal sides?",
			options: ["Scalene triangle", "Equilateral triangle", "Isosceles triangle", "Triangle"],
			answer: 1
		},
		{
			question : "What kind of triangle has no equal sides?",
			options: ["right triangle", "Equilateral triangle", "Isosceles triangle", "Scalene triangle"],
			answer: 3
		},
		{
			question : "What kind of triangle has 2 equal sides?",
			options: ["Scalene triangle", "Equilateral triangle", "Isosceles triangle", "Triangle"],
			answer: 2
		},
		{
			question : "What shape has 3 sides?",
			options: ["Square", "Triangle", "Oblong", "Trapezoid"],
			answer: 1
		},

		{
			question : "Has 2 pairs of parallel sides and its opposite sides are equal.",
			options: ["Rhombus", "Rectangle", "Parallelogram", "Square"],
			answer: 2
		},
		{
			question : "A parallelogram that has 4 right angles. Its opposite sides are equal.",
			options: ["Rhombus", "Circle", "Square", "Rectangle"],
			answer: 3
		},
		{
			question : "A parallelogram that has 4 equal sides.",
			options: ["Rhombus", "Rectangle", "Square", "Circle"],
			answer: 0
		},
		{
			question : "Has only one pair of opposite sides that are parallel.",
			options: ["Square", "Trapezoid", "Rectangle", "Triangle"],
			answer: 1
		},
		{
			question : "A parallelogram that has 4 equal sides and 4 right angles.",
			options: ["Trapezoid", "Rectangle", "Square", "Circle"],
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