var topics = ["dog", "cat", "parrot", "elephant", "mouse", "eagle", "tiger", "gorilla", "ferret", "shark"];

var queryURL;

$(document).ready(function(){

	//creating initial buttons for the topic, attributing data to it, and pushing it into the html
	// for (var i = 0; i < topics.length; i++){
	// 	var b = $('<button>');
	// 	b.text(topics[i]).attr('data-name', topics[i]);
	// 	b.addClass('buttons');
	// 	$('.button-div').prepend(b);
	// 	}

	function createButtons(array){
		for (var i = 0; i < array.length; i++){
			var b = $('<button>');
			b.text(array[i]).attr('data-name', convertToPlus(array[i]));
			//b.text(convertToSpace(array[i])).attr('data-name', convertToSpace(array[i]));
			
			b.addClass('buttons');

			$('.button-div').prepend(b);
			}
			//.on click
			runOnClick();
	}
	createButtons(topics);

	function addToArray(word){
		
		topics.push(word);
		
		// var elem = $('<button>');
		// elem.text(word).attr('data-name', word);
		// elem.addClass('buttons');
		// $('.button-div').prepend(elem);
		$('.button-div').empty();
		$('#textbox').val(""); //clears the input text box after submitting
		// createButtons(topics);
	}

	$('form').submit(function() {
		var userWord = $('#textbox').val().trim();
		// topics.push(userWord);
		// console.log("does this work?: " + userWord);
		addToArray(userWord);
		createButtons(topics);
		return false;
	});


	function runOnClick() {
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
	}

	function convertToPlus(word) {
		var spaceString = " ";
		//var withoutSpaces = word.replace(“ “, “+”);
		var withoutSpaces = word.replace(spaceString, "+");
		//console.log(withoutSpaces);
		return withoutSpaces;

		//return word;
		//so when you call this, do var blah[i] = convertSpaces(blah[i]);
	}
	function convertToSpace(word) {
		var plusString = "+";
		//var withoutSpaces = word.replace(“ “, “+”);
		var withSpaces = word.replace(plusString, " ");
		console.log(withSpaces);
		return withSpaces;
	}
});