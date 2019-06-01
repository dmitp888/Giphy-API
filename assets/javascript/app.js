var superheroes = ["captain america", "spider-man", "hulk", "green arrow", "jessica jones", "x-men",
    "umbrella academy", "aquaman", "thor"];
function renderButtons() {
    // Deleting the Superheros prior to adding new Superheros
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Looping through the array of Superheros
    // Then dynamicaly generating buttons for each superhero in the array
    for (i = 0; i < superheroes.length; i++) {
        var buttons = $("<button>");
        buttons.text(superheroes[i]);
        buttons.addClass("buttonslook");
        buttons.attr("data-name", superheroes[i]);
        $("#buttons-view").append(buttons);
    };
}
// Adding click event listen listener to all buttons
$(document).on("click", ".buttonslook", "newbutton", function () {
    $("#gifs-appear-here").empty();
    var superhero = $(this).attr("data-name");
    var key = "mQIiV1DbxnGqe3cVutgW0NTCFQ9VYwXD"
    // Constructing a queryURL using the superhero name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + superhero + "&api_key=" + key +
        "&limit=10";
    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            console.log(queryURL);
            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
                var p = $("<p>").text("Rating: " + results[i].rating);
                console.log(results[i].rating);
                var gifDiv = $("<div class=\"superhero-item\">");
                // Creating and storing an image tag
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var superheroImg = $("<img>");
                superheroImg.attr("src", still);
                superheroImg.attr("data-still", still);
                superheroImg.attr("data-animate", animated);
                superheroImg.attr("data-state", "still");
                superheroImg.addClass("gif");

                gifDiv.append(p);
                gifDiv.append(superheroImg);
                $("#gifs-appear-here").append(gifDiv);
            }
        })
})
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var superhero = $("#gif-input").val().trim();
    // Adding superhero from the textbox to our array
    superheroes.push(superhero);
    console.log(superhero, superheroes)
    // Calling renderButtons which handles the processing of our superhero array
    renderButtons();
});
$(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Adding a click event listener to all elements with a class of "superhero-btn"
renderButtons();
