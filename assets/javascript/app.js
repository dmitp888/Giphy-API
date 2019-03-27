var superheroes = ["captain america", "spider-man", "hulk", "green arrow", "jessica jones", "x-men",
"umbrella academy"];
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
            var p = $("<p>").text(results[i].rating);
            console.log(results[i].rating);
            var gifDiv = $("<div>");
            // Creating and storing an image tag
            var superheroImg = $("<img>");
            //
            var still = results[i].images.fixed_height_still.url;
            var animate = results[i].images.fixed_height.url;
            superheroImg.attr("src", animate);
            gifDiv.append(p);
            gifDiv.append(superheroImg);
            superheroImg.addClass("gif");
            $(".gif").attr("data-state", "still");
            $("#gifs-appear-here").prepend(gifDiv);
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
$(".gif").on("click", function () {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
var state = $(this).attr("data-state");
// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// Then, set the image's data-state to animate
// Else set src to the data-still value
if (state === "still") {
$(this).attr("src", still);
$(this).attr("data-state", "");
} else {
$(this).attr("src", animate);
$(this).attr("data-state", "still");
}       
            });

// Adding a click event listener to all elements with a class of "superhero-btn"
renderButtons();
