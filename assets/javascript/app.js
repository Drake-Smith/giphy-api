var topics = ["dog", "cat", "parrot", "elephant", "mouse", "eagle", "tiger", "gorilla", "ferret", "shark"];

var queryURL;

$(document).ready(function(){

	
	//creating initial buttons for the topic, attributing data to it, and pushing it into the html
	for (var i = 0; i < topics.length; i++){
		var b = $('<button>');
		b.text(topics[i]).attr('data-name', topics[i]);
		b.addClass('buttons');
		$('.button-div').prepend(b);
		}
	
	function createButton(word){

		var elem = $('<button>');
		elem.text(word).attr('data-name', word);
		elem.addClass('buttons');
		$('.button-div').prepend(elem);
	}

	
	$('form').submit(function() {
		var userWord = $('#textbox').val();
		topics.push(userWord);
		console.log("does this work?: " + userWord);
		createButton(userWord);
	});

	$('.buttons').on('click', function() {
		var selected = $(this).attr('data-name');
		queryURL = "http://api.giphy.com/v1/gifs/search?q=" + selected + "&api_key=dc6zaTOxFJmzC&limit=10";
		console.log(queryURL);

		$.ajax({
				url: queryURL,
				method: 'GET'
			})
			.done(function(response) {
				var results = response.data;

				for (var i = 0; i < results.length; i++) {
					var gif = $('<div class="eachGif">');

					var p = $('<p>').text('Rating: ' + results[i].rating);
					var img = $('<img>');
					img.addClass('test');
					img.attr('src', results[i].images.fixed_height_still.url);
					img.attr('data-still', results[i].images.fixed_height_still.url);
					img.attr('data-animate', results[i].images.fixed_height.url);
					img.attr('data-state', "still");
					// console.log(img);
					gif.append(p);
					gif.append(img);
					$('.gif-div').prepend(gif);
				}

	$('.test').on('click', function() {
				var state = $(this).attr('data-state');
				console.log("state: " + state);

				if (state === "still") {
					var changeState = $(this).attr('data-animate');
					$(this).attr('src', changeState);
					$(this).attr('data-state', 'animate');

				}
				if (state !== "still") {
					// changeState = $(this).attr('data-still');
					$(this).attr('src', $(this).attr('data-still'));
					$(this).attr('data-state', "still");
				}
	});
			
			});	
	});

	function createButton(userWord){
		//converts what user typed into a button
		//appends it to the existing buttons, 
	}
	function convertSpaces(word) {
		//word.replace(“ “, “+”)
		//return word;
		//so when you call this, do var blah[i] = convertSpaces(blah[i]);
	}



});