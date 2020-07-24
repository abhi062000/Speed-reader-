$(function () {

    // variables
    var myArray;
    var inputLength;
    var reading = false;
    var counter;
    var action;
    var frequency = 200;

    $("#new").hide();
    $("#resume").hide();
    $("#pause").hide();
    $("#controls").hide();
    $("#error").hide();
    $("#result").hide();

    // click on start reading
    $('#start').click(function () {
        // get text and split into words
        // \s to escape spaces, tabs etc and + for one or more
        myArray = $('#userInput').val().split(/\s+/);
        inputLength = myArray.length;

        if (inputLength > 1) {
            reading = true;
            $("#start").hide();
            $("#error").hide();
            $("#userInput").hide();
            $("#new").show();
            $("#pause").show();
            $("#controls").show();

            // set progress slider max
            $('#progresslider').attr("max", inputLength - 1);

            // start counter at zero
            counter = 0;

            // show reading box with first word
            $("#result").show();
            $("#result").text(myArray[counter]);

            // start reading from first word
            action = setInterval(read, frequency);

        } else {
            $('#error').show();
        }
    })

    // sliding fontsize slider
    $('#fontsizeslider').on('slidestop', function (event, ui) {
        // event.preventDefault();
        $(this).slider('refresh');
        var slidervalue = parseInt($('#fontsizeslider').val());
        console.log(slidervalue);
        $('#result').css("fontSize", slidervalue);
        $('#fontsize').text(slidervalue);
    })

    // sliding speed slider
    $('#speedslider').on('slidestop', function (event, ui) {
        // event.preventDefault();
        $(this).slider('refresh');
        var slidervalue = parseInt($('#speedslider').val());


        $('#wpm').text(slidervalue);
        // stop reading
        clearInterval(action);

        // change freq
        frequency = 60000 / slidervalue;

        // resume reading if we are in reading mode
        if (reading) {
            action = setInterval(read, frequency);
        }
    })

    // progress slider
    $('#progresslider').on('slidestop', function (event, ui) {
        // event.preventDefault();
        $(this).slider('refresh');
        var slidervalue = parseInt($('#progresslider').val());



        // stop reading
        clearInterval(action);

        counter = slidervalue;

        // change word
        $('#result').text(myArray[counter]);

        $('#percentage').text(Math.floor(counter / (inputLength - 1) * 100));

        // resume reading if we are in reading mode
        if (reading) {
            action = setInterval(read, frequency);
        }
    })


    // click on new button
    $('#new').click(function () {
        // reloading the page
        location.reload();
    })

    // click on pause 
    $('#pause').click(function () {
        // stop reading adn switch to non reading mode
        clearInterval(action);
        reading = false;
        $('#pause').hide();
        $('#resume').show();
    })

    // click on resume 
    $('#resume').click(function () {
        action = setInterval(read, frequency);
        reading = true;
        $('#pause').show();
        $('#resume').hide();
    })

    // functions
    function read() {

        if (counter == inputLength - 1) {
            clearInterval(action);
            reading = false;
            $('#pause').hide();
        } else {
            counter++;

            $("#result").text(myArray[counter]);
            // changing progress slider
            $("#progresslider").val(counter);

            $("#progresslider").slider('refresh');


            $('#percentage').text(Math.floor(counter / (inputLength - 1) * 100));


        }
    }
})