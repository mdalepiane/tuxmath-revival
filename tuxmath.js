// BACKBONE //
//////////////
var app = app || {};
// MODELS //
app.Equation = Backbone.Model.extend({
	defaults: {
		expression: '',
		value: ''
	}
});

// VIEWS //
app.EquationView = Backbone.View.extend({
	tagName: 'div',

	template: _.template($('#equation-template').html()),

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

// COLLECTIONS //
app.Equations = Backbone.Collection.extend({
	model: app.Equation,


});
//

var NUM_EQUATIONS = 50;
var MAX_SIMULTANEOUS = 3;
var DELAY = 2000;
var FALL_TIME = 10000;
var MAX_VAL = 20;

var lastColumn = -1;
var score = 0;
var total = 0;


function Equation(expr, value) {
	this.expr = expr;
	this.value = value;
}

function newEquation() {
	var a = Number.parseInt(Math.random() * MAX_VAL);
	var b = Number.parseInt(Math.random() * MAX_VAL);
	return new Equation(a + '+' + b, a+b);
}

function addEquation(equation) {
	var column = -1;
	do {
		column = Number.parseInt(Math.random() * 5);
	} while(column === lastColumn);

	var left = $('body').width()/5 * (column);

	var element = '<div class="equation" style="left: ' + left + '" value="' + equation.value + '">' + equation.expr + '</div>';
	$('body').append(element);

	lastColumn = column;
}

function countSimultaneousEquations() {
	return $('.equation').length;
}

function addNewEquation() {
	addEquation(newEquation());
	animate();
}

function addEquations(){
	for(var i = 0; i < MAX_SIMULTANEOUS ; i++) {
		window.setTimeout(addNewEquation, i*DELAY);
	}
	/*
	for(var i = 0 ; i < NUM_EQUATIONS ; i++) {
		window.setTimeout(addNewEquation, i*DELAY);
	}
	*/
}

function updateScore(correct) {
	if(countSimultaneousEquations() < MAX_SIMULTANEOUS) {
		window.setTimeout(addNewEquation, DELAY/2);
	}
	if(correct) {
		score++;
	} else {
		total++;
	}
	$("#score").text("Score: " + score + "/" + total);
}

function animate() {
	var fallHeight = $('body').height() - 13;
	$('.equation').animate({top: fallHeight}, FALL_TIME, function(){
		$(this).remove();
		updateScore(false);
	});
}

function handleInput() {
	var answer = Number.parseInt($(this).val());
	console.log(answer)
	var eqs = $('.equation');
	for(var i = 0 ; i < eqs.length ; i++) {
		if(Number.parseInt($(eqs[i]).attr('value')) === answer) {
			$(eqs[i]).finish();
			updateScore(true);
		}
	}
	$(this).val("");
}

$(document).ready(function(){
	addEquations();
	$('#answer').on('change', handleInput);
});