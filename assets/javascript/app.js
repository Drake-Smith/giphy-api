var topics = ["pikachu", "happy", "conan o'brien", "will ferrell", "cat", "funny", "dog", "crazy"]; //initial buttons that are created

var queryURL;

$(document).ready(function() {

    createButtons(topics); //this is the initial setup of buttons using createButtons function below

    //function that will create buttons from the topics array
    function createButtons(array) {
        for (var i = 0; i < array.length; i++) {
            var b = $('<button class="btn btn-primary">');
            b.text(array[i]).attr('data-name', convertToPlus(array[i]));
            b.addClass('buttons');
            $('.button-div').append(b);
        }
        runOnClick(); //animates/stops gifs when user clicks on gif
    }

    //this function adds the user inputted word into the topics array
    function addToArray(word) {
        topics.push(word);
        $('.button-div').empty();
        $('#textbox').val(""); //clears the input text box after submitting
    }

    //converts any spaces in the word user typed in into "+" so that it will work in the API URL
    function convertToPlus(word) {
        var spaceString = " ";
        var withoutSpaces = word.replace(spaceString, "+");
        return withoutSpaces;
    }

    //converts the "+" in between words back into space so that the "+" don't show on the screen when button created
    function convertToSpace(word) {
        var plusString = "+";
        var withSpaces = word.replace(plusString, " ");
        return withSpaces;
    }

    //when user hits submit, takes the word and creates a button from it
    $('#form').submit(function() {
        var userWord = $('#textbox').val().trim();
        addToArray(userWord);
        createButtons(topics);
        return false;
    });

    //when user clicks on a gif it will either start or stop the animation
    function runOnClick() {
        $('.buttons').on('click', function() {
            var selected = $(this).attr('data-name'); //
            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selected + "&api_key=dc6zaTOxFJmzC&limit=10";
            console.log(queryURL);

            $.ajax({ //calling the Gipy API
                    url: queryURL,
                    method: 'GET'
                })
                .done(function(response) {
                    var results = response.data;

                    //for loop that will create each gif, give it the proper data attributes, and prepend it to the screen
                    for (var i = 0; i < results.length; i++) {
                        var gif = $('<div class="eachGif" title="Click on gif to start/stop animation">');

                        var img = $('<img>').on('click', function() {
                            var state = $(this).attr('data-state');
                            //console.log("state: " + state);

                            if (state === "still") {
                                var changeState = $(this).attr('data-animate');
                                $(this).attr('src', changeState);
                                $(this).attr('data-state', 'animate');
                            }
                            if (state === "animate") {
                                $(this).attr('src', $(this).attr('data-still'));
                                $(this).attr('data-state', "still");
                            }
                        });

                        img.addClass('data-manage');
                        var still = results[i].images.fixed_height_still.url;
                        var animate = results[i].images.fixed_height.url;
                        img.attr('src', still); //accessing data from the giphy API object
                        img.attr('data-still', still);
                        img.attr('data-animate', animate);
                        img.attr('data-state', "still");
                        gif.append(img);
                        $('.gif-div').prepend(gif);
                    }
                });
        });
    }
});