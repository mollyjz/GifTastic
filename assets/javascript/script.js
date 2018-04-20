var apiKey = "rgefqvI6qcj2vCUzG1vz8YPeb2wKIKEZ";

var newBreed = "";

var breedsArray = ["poodle", "golden retriever", "springer spaniel", "dachsund", "chihuahua", "brittany spaniel", "collie", "greyhound", "chocolate lab", "shih tzu", "pug", "visla"];

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newBreed + "&limit=10" + "&rating=pg" + "&api_key=" + apiKey;

//NEED TO DEFINE RESPONSE??

$.ajax({
    url: queryURL,
    method: "GET"
    
  }).then(function(response) {
    
    console.log(response);
    //HOW DOES BROWSER KNOW WHAT RESPONSE IS??
    
    
//statically load form to submit dog breed types, AND pre-loaded dog breed buttons??

//function to create buttons for items in breeds array
function addButtons() {
    $("#button-container").empty(); //delete existing buttons to avoid repeats
    for (var i=0; i<breedsArray.length; i++) {
        var dogButton = $("<button>");
        dogButton.addClass(".dog-button");
        dogButton.attr("data-breed", breedsArray[i]);
        dogButton.text(breedsArray[i]);
        $("#button-container").append(dogButton);
    }
}

addButtons();


//NEED TO DISPLAY INITIAL BUTTONS *AND* ONES THAT ARE ADDED!!!!!
//when new dog breed is submitted, push to array and create button
$("#submit-button").on("click", function(event) {
    event.preventDefault();
    var newBreed = $("#breed-field").val().trim();
    breedsArray.push(newBreed); //SHOULD ONLY ADD ONCE ON CLICK
    addButtons();
    console.log("hello")
}); //how to do in real time?


//when a dog breed button is clicked, load 10 gifs related to that theme plus each gif's rating
$(".dog-button").on("click", function() {
//    var rating = results.rating;
//    var stillImage;
//    var movingImage;
    $("#gif-container").empty(); //clear gifs from last button click
    for (var i=0; i<10; i++) {
        var results = response.data[i];
        var stillImageUrl = results.images.fixed_height_still.url;
        var movingImageUrl = results.images.fixed_height.url;
        var stillImage = $("<img>");
        stillImage.attr("src", stillImageUrl[i]);
        $("#gif-container").prepend(stillImage);
        stillImage.prepend(rating);
        stillImage.on("click", function() { //when still image clicked, it starts moving
            stillImage.attr("src", movingImageUrl[i]);
        });
        var movingImage = $("<img>"); //when moving image clicked, it stops moving
        movingImage.on("click", function() {
            movingImage.attr("src", stillImageUrl[i])
        });
    }
});
});