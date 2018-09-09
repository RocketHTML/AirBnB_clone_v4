//returns if box is checked

let checked = {};
$(document).ready(function () {
    $('input:checkbox').change(function () {
	if ($(this).is(':checked')) {
	    checked[$(this).data('id')] = $(this).data('name');
	} else {
	    delete checked[$(this).data('id')];
	}
	$('div.amenities h4').html(function () {
	    let amenities = [];
	    Object.keys(checked).forEach(function (key) {
		amenities.push(checked[key]);
	    });
	    if (amenities.length === 0) {
		return ('&nbsp');
	    }
	    return (amenities.join(', '));
	});
    });
});

$.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
	for (let currentPlace of data) {
	    $('.places').append('<article> <div class="title"> <h2>' + currentPlace.name + '</h2><div class="price_by_night">' + '$' + currentPlace.price_by_night + '</div></div><div class="information"> <div class="max_guest"> <i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + currentPlace.max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i>
<br />' + currentPlace.number_rooms + ' Bedrooms </div> <div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_bathrooms +
				' Bathroom  </div></div> <div class="user"></div><div class="description">' + currentPlace.description + '</div></article>');
	}
    }
});