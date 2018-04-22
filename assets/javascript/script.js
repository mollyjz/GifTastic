var newBreed = "";

var breedsArray = ["poodle", "golden retriever", "springer spaniel", "dachsund", "chihuahua", "brittany spaniel", "collie", "greyhound", "chocolate lab", "shih tzu", "pug", "visla"];

//statically load form to submit dog breed types, AND pre-loaded dog breed buttons????

//function to create buttons for items in breeds array
function addButtons() {
    $("#button-container").empty(); //delete existing buttons to avoid repeats
    for (var i = 0; i < breedsArray.length; i++) {
        //console.log("hello?") - WORKS!!;
        var dogButton = $("<button>");
        dogButton.addClass("dog-button");
        dogButton.attr("data-breed", breedsArray[i]);
        dogButton.text(breedsArray[i]);
        $("#button-container").append(dogButton);
    }
}

//NEED TO DISPLAY INITIAL BUTTONS *AND* ONES THAT ARE ADDED!!!!!
//when new dog breed is submitted, push to array and create button
$(document).ready(function() { //on load...
    addButtons(); //add buttons for breeds in pre-loaded array

    $(".dog-button").on("click", function() { //when dog breed button clicked, load 10 gifs related to that breed
        //console.log("hey!") - WORKS!!;
        var newBreed = $("#breed-field").val().trim(); //capture new breeds entered by user
        var apiKey = "";
        var url = "https://api.giphy.com/v1/gifs/search" //EXISTING BUTTONS SHOULD ALSO LOAD GIFS!!!!!!!!!!!!!!!!!!!!
        url += "?" + "q=" + $.param ({
            'q': newBreed, //NOT CAPTURING SEARCH TERMS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            'apiKey': "rgefqvI6qcj2vCUzG1vz8YPeb2wKIKEZ"
        });
        console.log(url);
        //var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newBreed + "&limit=10" + "&rating=pg" + "&api_key=" + apiKey;
        //var queryURL = "https://api.giphy.com/v1/gifs/search?q=dogs+&limit=10+&rating=pg+&api_key=rgefqvI6qcj2vCUzG1vz8YPeb2wKIKEZ";
        $.ajax({
            url: url,
            method: "GET"
        }).then(function(response) {
            $("#submit-button").on("click", function(event) { //when submit button is clicked...
                var newBreed = $("#breed-field").val().trim(); //capture new breeds entered by user
                event.preventDefault();
                breedsArray.push(newBreed); //SHOULD ONLY ADD ONCE ON CLICK //push new breeds to breed array
                //console.log("hello") WORKS;
                addButtons(); //add buttons for new array items
            });
            for (var i = 0; i < response.data.length; i++) {
                //console.log("what?") - works with updated queryURL;
                var rating = response.data[i].rating;
                var stillImageUrl = response.data[i].images.fixed_height_still.url;
                var movingImageUrl = response.data[i].images.fixed_height.url;
                var stillImage = $("<img>");
                stillImage.attr("src", stillImageUrl);
                $("#gif-container").prepend(stillImage);
                stillImage.prepend(rating);
                stillImage.on("click", function() { //when still image clicked, it starts moving
                    stillImage.attr("src", movingImageUrl);
                    var movingImage = $("<img>"); //when moving image clicked, it stops moving
                        movingImage.on("click", function() {
                            movingImage.attr("src", stillImageUrl)
                        });
                });
            }
        });
});
});