
var NUM_EQUATIONS = 50;
var DELAY = 2000;
var FALL_TIME = 10000;


var lastColumn = -1;


function Equation(expr, value) {
	this.expr = expr;
	this.value = value;
}

function newEquation() {
	var a = Number.parseInt(Math.random() * 50);
	var b = Number.parseInt(Math.random() * 50);
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

function addNewEquation() {
	addEquation(newEquation());
	animate();
}

function addEquations(){
	for(var i = 0 ; i < NUM_EQUATIONS ; i++) {
		window.setTimeout(addNewEquation, i*DELAY);
	}
}

function animate() {
	var fallHeight = $('body').height() - 13;
	$('.equation').animate({top: fallHeight}, FALL_TIME, function(){
		$(this).remove();
	});
}

function handleInput() {
	var answer = Number.parseInt($(this).val());
	console.log(answer)
	var eqs = $('.equation');
	for(var i = 0 ; i < eqs.length ; i++) {
		if(Number.parseInt($(eqs[i]).attr('value')) === answer) {
			$(eqs[i]).remove();
		}
	}
	$(this).val("");
}

$(document).ready(function(){
	addEquations();
	$('#answer').on('change', handleInput)
});