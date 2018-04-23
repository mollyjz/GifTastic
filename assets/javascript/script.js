var newBreed = "";
//var searchTerms = "";
var breedsArray = ["poodle", "golden retriever", "springer spaniel", "dachsund", "chihuahua", "brittany spaniel", "collie", "greyhound", "chocolate lab", "shih tzu", "pug", "visla"];
var dogButton;

$(document).ready(function() { //on page load...
    function addButtons() { //function to add buttons for items in array                                    //WORKS
        $("#button-container").empty(); //delete existing buttons to avoid repeats
        for (var i = 0; i < breedsArray.length; i++) { //create button for each item in dog breeds array
            var dogButton = $("<button>"); //create and store button
            dogButton.addClass("dog-button"); //add class
            dogButton.attr("data-breed", breedsArray[i]);  //ONLY CAPTURING FIRST BREED IN ARRAY!!!!!!!!!!!!!!!!!!!
            dogButton.text(breedsArray[i]); //add text of each breed to its button
            $("#button-container").append(dogButton); //append button to page
            //console.log(breedsArray[i])
            console.log(dogButton.breed) //*******************************************************************
            }
    }
 
    addButtons(); //add buttons for breeds in pre-loaded array                                          //WORKS
    $("#submit-button").on("click", function(event) { //any time submit button is clicked...
        event.preventDefault();
        newBreed = $("#breed-field").val().trim(); //capture new breeds entered by user
        breedsArray.push(newBreed); //push new breeds to array                                          //WORKS
        //console.log("this is working!");
        addButtons(); //add button for each new array item
        //console.log(data-breed);
    });
    $("#button-container").on("click", ".dog-button", function() { //when dog breed button clicked...                    //NOT WORKING!!!!!
        var buttonText = $(this).data("breed"); //capturing text of each dog button
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
            //console.log(url);
            $("#gif-container").on("click", ".still-image", function() { //when still image clicked...
                var imageGif = $(this); //refers to the image you've clicked
                if (imageGif.attr("src") === imageGif.attr("data-moving")) { //if url of image = moving image url
                    imageGif.attr("src", "data-still"); //assign still image url
                    $("<img>");  //CHANGES SRC BUT DELETES IMG ON CLICK!!!!!!!!!!!!!!!!!!!!!!!!!!!
                } else { //otherwise...
                    imageGif.attr("src", "data-moving"); //assign data moving url to make it move
                    $("<img>");
                }
            });
            for (var i = 0; i < response.data.length; i++) { //for each of the 10 gif responses from the api...
                //console.log("this works!");
                var rating = response.data[i].rating; //grab that gif's rating from api data
                var stillImageUrl = response.data[i].images.fixed_height_still.url; //store URL for still image
                var movingImageUrl = response.data[i].images.fixed_height.url; //store URL for animated gif
                var stillImage = $("<img>"); //create variable to store still image
                stillImage.attr("data-moving", movingImageUrl);
                //movingImage.attr("data-still", stillImageUrl);
                stillImage.attr("src", stillImageUrl); //assign URL to still image
                stillImage.addClass("still-image");
                $("#gif-container").prepend(stillImage); //prepend still image to container
                stillImage.prepend(rating); //prepend rating to still image
                
            }
        });
});
});