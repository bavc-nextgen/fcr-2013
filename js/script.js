// list of all students, teachers
var members = [
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

// what happens when the page is ready
$(document).ready(function() {

	// enable click function for headers
	$('#heading a').click(function() {
		resetFaces();
	});

	// generate member list
	generateMemberList();

	// generate faces faces
	generateFaces();
});	

var generateMemberList = function() {
	var members_elem = $('#members');
	// loop through each of the 'members' array
	$(members).each(function(i, v) {
		// create an element that we will fill with content for each face
		var elem = $('<li><a href="#">'+v+'</a></li>');

		// find the <a> element in the elem, and assign a click event
		elem.find('a').click(function(e){
			loadProfile(v);
		});

		// append each element to the base element
		members_elem.append(elem);
	});
};

var resetFaces = function() {
	// reset
	$('#profile').empty();
	generateFaces();
};

// generate faces function
var generateFaces = function() {
	
	// create a variable for the faces element
	var base_elem = $('#faces');

	// create a variable for the profile element
	var profile_elem = $('#profile')	

	// shuffle faces
	members.sort(function() { return 0.5 - Math.random(); });

	// empty base element
	base_elem.empty();

	// loop through each of the 'members' array
	$(members).each(function(i, v) {
		// create an element that we will fill with content for each face
		var elem = $('<li><a href="#"></a></li>');

		// set all elements to have a unique background image based on the members array
		elem.css({
			"background-image" : "url('images/" + v + ".jpg')",			
		});

		// find the <a> element in the elem, and assign a click event
		elem.find('a').click(function(e){
			loadProfile(v);
		});

		// append each element to the base element
		base_elem.append(elem);
	});
};


var loadProfile = function(person) {

	// get the associated data json for each of the elements
	$.getJSON( "data/" + person + ".json", function(data) {
		// fill the profile with the appropriate content
		$('#profile').html( 
			'<h2>' + data.name + '</h2>' +
			'<p><a href="profiles/' + data.name + '">profile page</a></p>' +
			'<p><a href="' + data.pathbrite + '">pathbrite portfolio</a></p>'
		 );
	});

	// set all the faces to one face
	$("#faces li").css({
		"background-image" : "url('images/" + person + ".jpg')",
		"background-attachment" : "fixed",
		"background-repeat" : "none"
	});
}
