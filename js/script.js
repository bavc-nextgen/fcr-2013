// list of all students, instructors
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


$(document).ready(function() {
	
	$('#heading a, #remix_button').click(function(e) {
		e.preventDefault();
		resetFaces();
	});

	generateMemberList();
	generateFaces();

	// permalinking the hash
	if (window.location.hash && $.inArray( people, window.location.hash)) {
		setTimeout(function() {
			loadProfile( window.location.hash.replace('#', '') );
		}, 150);
	}
});


var generateMemberList = function() {
	var people_elem = $('#people');
	$(people).each(function(i, v) {
		var elem = $('<li><a href="#">' + v + '</a> ' + ((v == "jon" || v == "gabe") ? '<small>(instructor)</small>' : '') + '</li>');
		elem.find('a').click(function(e){
			loadProfile(v);
		});
		people_elem.append(elem);
	});
};


var resetFaces = function() {
	window.location.hash = "";
	$('#face').fadeOut(250);
	$('#profile').fadeOut(250);
	generateFaces();
};


var generateFaces = function() {

	var base_elem = $('#faces');
	var profile_elem = $('#profile')

	people.sort(function() { return 0.5 - Math.random(); });

	base_elem.empty();
	base_elem.unbind('mousemove');
	base_elem.mousemove(function(e) {
		var elem = $(base_elem).find('li');
		var i = 0;
		var mx = e.clientX;
		var my = e.clientY - $('#faces').height() / 2 - 80;
		for(var yy = 0; yy < 4; yy++) {
			for (var xx = 0; xx < 3; xx++) {
				var ix = ((-xx * base_elem.width()  / 3) + mx),
					  iy = ((-yy * base_elem.height() / 4) + my);
				$(elem[i]).css({ "background-position" : ix + "px " + iy +"px" });
				i++;
			}
		}
	});

	// loop through each of the 'people' array. it's a 3x4 grid
	var i = 0;
	for(var yy = 0; yy < 4; yy++) {
		for (var xx = 0; xx < 3; xx++) {
			var p = people[i],
				elem = $('<li><a href="#"></a></li>'),
				a = elem.find('a');
			elem.css({
				"background-image" : "url('images/" + p + ".jpg')",
				"background-position" : "-" + String( xx * base_elem.width() / 3 ) + "px -" + String( yy *  base_elem.height() / 4 ) + "px"
			});
			var click = (function(p) {
				return function() {
					loadProfile(p);
				}
			})(p);
			a.unbind('click');
			a.click(click);
			base_elem.append(elem);
			i++;
		}
	}
};


var loadProfile = function( person ) {
	if ($('#profile').is(':parent')) {
		$('#profile').fadeOut(250, function() {
			$('#profile').empty();
		});
	}
	$("#face").fadeOut(250, function() {
		$.getJSON( "data/" + person + ".json", function(data) {
			var html = "";
			if ((typeof data.instructor != 'undefined')) {
				html =
					'<h2>' + data.name + '</h2>' + 
					'<p><small>(instructor)</small></p>';
			} else {
				html += 
					'<h2>' + data.name + '</h2>';
				if (data.featured) {
					html += "<p>Featured Project</p>"
					html += '<a href="'+data.featured[1]+'">'
					html += '<img src="profiles/' + data.name.toLowerCase() + '/' + data.featured[0] + '" />';
					html += '</a>'
					html += "<br/>"	
				}
				html += 
					'<p><a href="profiles/' + data.name.toLowerCase() + '">More Projects...</a></p>' +
					'<p><small>' + 
					'<a href="' + data.pathbrite + '">Pathbrite</a> | ' +
					'<a href="' + data.linkedin + '">LinkedIn</a>' + 
					'</small></p>';
			}


			$('#profile').html(html);
			$('#profile').fadeIn();
			resetFace();
		});
		resetFace();
		$("#face").css({
			"background-image" : "url('images/" + person + ".jpg')"
		}).fadeIn(250, function() {
			generateFaces();
			window.location.hash = person;
		});
	});
};


var resetFace = function() {
	$("#face").css({
		"left" : $('#faces').offset().left,
		"top"  : $('#faces').offset().top
	});
};
