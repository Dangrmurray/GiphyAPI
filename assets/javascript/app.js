


$(document).ready(function(){

var movies = ["Footloose", "Dirty Dancing", "Tommy Boy", "Hot Fuzz", "Blazing Saddles", "Lord of the Rings", "The Departed"]





function showButtons(){
    $("#buttonsDiv").empty(); 
    for (var i = 0; i < movies.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.attr("data-name", movies[i]);
        gifButton.text(movies[i]);
        $("#buttonsDiv").append(gifButton);
    }
}

function addButton(){
    $("#submitButton").on("click", function(){
    var movie = $("#movieInput").val().trim();
    if (movie == ""){
      return false; 
    }
    movies.push(movie);

    showButtons();
    return false;
    });
}

function displayGifs(){
    var movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=l5xKiftAmQscKN1TbEzgVNYI5DqFrdGz&limit=15";
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        $("#gifsBox").empty(); 
        var results = response.data; 
        if (results == ""){
          alert("No gif available");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
 
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); 
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            
            $("#gifsBox").prepend(gifDiv);
        }
    });
}

showButtons(); 
addButton();

$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});





























