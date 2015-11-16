

var lastColumn = -1;

function newEquation() {
	var a = Number.parseInt(Math.random() * 50);
	var b = Number.parseInt(Math.random() * 50);
	return a + '+' + b;
}

function addEquation(equation) {
	var column = -1;
	do {
		column = Number.parseInt(Math.random() * 5);
	} while(column === lastColumn);

	var left = $('body').width()/5 * (column);

	var element = '<div class="equation" style="left: ' + left + '">' + equation + '</div>';
	$('body').append(element);

	lastColumn = column;
}

function addNewEquation() {
	addEquation(newEquation());
	animate();
}

function addEquations(){
	for(var i = 0 ; i < 50 ; i++) {
		window.setTimeout(addNewEquation, i*1000);
	}
}

function animate() {
	var fallHeight = $('body').height() - 13;
	$('.equation').animate({top: fallHeight}, 5000, function(){
		$(this).remove();
	});
}

function handleInput() {
	var answer = Number.parseInt($(this).val());
	console.log(answer)
	$(this).val("");
}

$(document).ready(function(){
	addEquations();
	$('#answer').on('change', handleInput)
});