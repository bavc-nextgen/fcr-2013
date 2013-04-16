// list of all students, teachers
var people = [
	"amy", 
	"andrew", 
	"angelisa", 
	"bianca", 
	"bradley", 
	"dwana", 
	"gabe", 
	"jon", 
	"karina", 
	"kevin", 
	"koby", 
	"my"
];

$(window).resize(function() {
	resetFace();
});

// what happens when the page is ready
$(document).ready(function() {

	// enable click function for headers
	$('#heading a, #remix_button').click(function() {
		resetFaces();
	});

	// generate member list
	generateMemberList();

	// generate faces faces
	generateFaces();
});	

var generateMemberList = function() {
	var people_elem = $('#people');
	// loop through each of the 'people' array
	$(people).each(function(i, v) {
		// create an element that we will fill with content for each face
		var instructor  = (v == "jon" || v == "gabe") || false;
		var elem = $('<li><a href="#">'+v+'</a> ' + (instructor ? '<small>(instructor)</small>' : '') + '</li>');

		// find the <a> element in the elem, and assign a click event
		elem.find('a').click(function(e){
			loadProfile(v);
		});

		// append each element to the base element
		people_elem.append(elem);
	});
};

var resetFaces = function() {
	// reset
	$('#profile').empty();
	$('#face').fadeOut(250);
	generateFaces();
};

// generate faces function
var generateFaces = function() {
	
	// create a variable for the faces element
	var base_elem = $('#faces');

	// create a variable for the profile element
	var profile_elem = $('#profile')	

	// shuffle faces
	people.sort(function() { return 0.5 - Math.random(); });

	// empty base element
	base_elem.empty();

	// loop through each of the 'people' array. it's a 3x4 grid
	var i = 0;
	for(var yy = 0; yy < 4; yy++) {
		for (var xx = 0; xx < 3; xx++) {

			var p = people[i];
			var elem = $('<li><a></a></li>');

			elem.css({
				"background-image" : "url('images/" + p + ".jpg')",
				"background-position" : "-" + String( xx * 150 ) + "px -" + String( yy * 150 ) +"px"
			});		
			
			var click = (function(p) {
				return function() {
					loadProfile(p);
				}
			})(p);
			elem.find('a').click(click);

			base_elem.append(elem);

			i++;
		}
	}
};


var loadProfile = function(person) {

	$("#face").fadeOut(250, function() {

		// get the associated data json for each of the elements
		$.getJSON( "data/" + person + ".json", function(data) {
			// fill the profile with the appropriate content
			$('#profile').html( 
				'<h2>' + data.name + '</h2>' +
				'<p><a href="profiles/' + data.name + '">profile</a></p>' +
				'<p><a href="' + data.pathbrite + '">pathbrite</a></p>' + 
				'<p><a href="' + data.linkein + '">linkedin</a></p>'
			 );

			resetFace();
		});
		
		resetFace();
		
		$("#face").css({
			"background-image" : "url('images/" + person + ".jpg')"
		}).fadeIn(250, function() {
			generateFaces();
		});
	});
}

var resetFace = function() {
	$("#face").css({
		"left" : $('#faces').offset().left,
		"top" : $('#faces').offset().top
	});
}
