var newBreed = "";
//var searchTerms = "";
var breedsArray = ["poodle", "golden retriever", "springer spaniel", "dachsund", "chihuahua", "brittany spaniel", "collie", "greyhound", "chocolate lab", "shih tzu", "pug", "visla"];
var dogButton;

//NOW, PREEXISTING BUTTONS DON'T LOAD GIFS UNTIL YOU'VE CLICKED AN ADDED BUTTON!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function addButtons() { //function to add buttons for items in array                                    //WORKS
    $("#button-container").empty(); //delete existing buttons to avoid repeats
    for (var i = 0; i < breedsArray.length; i++) { //create button for each item in dog breeds array
        var dogButton = $("<button>"); //create and store button
        dogButton.addClass("dog-button"); //add class
        dogButton.attr("data-breed", breedsArray[i]);  //ONLY CAPTURING FIRST BREED IN ARRAY!!!!!!!!!!!!!!!!!!!
        dogButton.text(breedsArray[i]); //add text of each breed to its button
        $("#button-container").append(dogButton); //append button to page
        //console.log(breedsArray[i])
        //console.log(breed) doesn't work                                                               //WORKS
    }
}

$(document).ready(function() { //on page load...
    addButtons(); //add buttons for breeds in pre-loaded array                                          //WORKS
    $("#submit-button").on("click", function(event) { //any time submit button is clicked...
        event.preventDefault();
        newBreed = $("#breed-field").val().trim(); //capture new breeds entered by user
        breedsArray.push(newBreed); //push new breeds to array                                          //WORKS
        //console.log("this is working!");
        addButtons(); //add button for each new array item
        //console.log(data-breed);
    $(".dog-button").on("click", function() { //when dog breed button clicked...                    //NOT WORKING!!!!!
        var buttonText = $(".dog-button").data("breed"); //capturing text of that dog button
        var url = "https://api.giphy.com/v1/gifs/search";
        url += "?" + $.param({
            'q': buttonText, //NOW, NO MATTER WHAT BUTTON IS CLICKED, 'POODLE' IS ALWAYS THE SEARCH TERM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            'limit': 10,
            'rating': 'pg',
            'api_key': 'rgefqvI6qcj2vCUzG1vz8YPeb2wKIKEZ'
        });
        $.ajax({                                                                                        //WORKS
            url: url,
            method: "GET"
        }).then(function(response) {                                                                //NOT WORKING!!!!!
            console.log(url);
            for (var i = 0; i < response.data.length; i++) { //for each of the 10 gif responses from the api...
                //console.log("this works!");
                var rating = response.data[i].rating; //grab that gif's rating from api data
                var stillImageUrl = response.data[i].images.fixed_height_still.url; //store URL for still image
                var movingImageUrl = response.data[i].images.fixed_height.url; //store URL for animated gif
                var stillImage = $("<img>"); //create variable to store still image
                stillImage.attr("src", stillImageUrl); //assign URL to still image
                $("#gif-container").prepend(stillImage); //prepend still image to container
                stillImage.prepend(rating); //prepend rating to still image
                stillImage.on("click", function() { //when still image clicked...
                    stillImage.attr("src", movingImageUrl); //change URL to that of the moving gif so it starts moving
                    var movingImage = $("<img>"); //create variable to store moving image
                        movingImage.on("click", function() { //when moving image clicked, ...
                            movingImage.attr("src", stillImageUrl) //change src back to that of the still image so that it stops moving
                        }); // ^ ONLY WORKING FOR FIRST IMAGE IN ARRAY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                });
            }
        });
});
});
});