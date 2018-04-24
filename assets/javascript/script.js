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

    $("#button-container").on("click", ".dog-button", function() { //when dog breed button clicked...
        var buttonText = $(this).data("breed"); //capturing text of each dog button
        var url = "https://api.giphy.com/v1/gifs/search";
        url += "?" + $.param({
            'q': buttonText,
            'limit': 10,
            'rating': 'pg',
            'api_key': 'rgefqvI6qcj2vCUzG1vz8YPeb2wKIKEZ'
        });
        $.ajax({                                                                                        //WORKS
            url: url,
            method: "GET"
        }).then(function(response) {                                                                //NOT WORKING!!!!!
            //console.log(url);
            for (var i = 0; i < response.data.length; i++) { //for each of the 10 gif responses from the api...
                var stillImageUrl = response.data[i].images.fixed_height_still.url; //store URL for still image
                var movingImageUrl = response.data[i].images.fixed_height.url; //store URL for animated gif
                var stillImage = $("<img>"); //create variable to store still image
                stillImage.attr("src", stillImageUrl); //assign stillImage URL 
                stillImage.addClass("still-image");
                $("#gif-container").prepend(stillImage); //prepend still image to container
                stillImage.prepend(response.data[i].rating); //prepend rating to still image
            }

            $("#gif-container").on("click", ".still-image", function() { //when still image clicked...
                var imageGif = $(this); //refers to the image you've clicked
                if (imageGif.attr("src") == movingImageUrl) { //if url of image = moving image url
                    imageGif.attr("src", stillImageUrl); //assign still image url
                } else { //otherwise...
                    imageGif.attr("src", movingImageUrl); //assign data moving url to make it move //WHY IS MOVINGIMAGEURL BEING READ AS THE URL OF THE FIRST GIF IN THE ARRAY?????
                }
            });        
        });
    });
});