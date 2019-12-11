// API credentials
const recipeAppID = "599eeff6";
const recipeApiKey = "9ba899b6cf470706c026e545e7e3e1b6";

// Change this to however many hits you want the page to display after a search
const maxHits = 12;

$(document).ready(function () {
    // Hide our dynamic content until it is needed
    $("#previewCards").hide();
    $("#recipeNutritionCard").hide();

    // Give the search field focus when the page first loads
    $("#searchField").focus();

    // Define click handler for search button
    $("#searchButton").click(function (event) {
        event.preventDefault();

        // Get the text from the search field, trimming off any excess white space
        var searchText = $("#searchField").val().trim();

        // Ensure valid imput before performing search
        if (searchText.length > 0) {
            getRecipes(searchText);
        } else {
            // To-do: replace this alert with a nicer modal
            alert("Search field cannot be blank.");
        }
    });
});

// Searches the recipe API for the specified dish and appends matching results in the search results area of the page
function getRecipes(searchText) {
    var queryUrl = "https://api.edamam.com/search?q=" + searchText + "&app_id=" + recipeAppID + "&app_key=" + recipeApiKey + "&from=0&to=" + maxHits;
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // Clear the search results div
        $("#previewCards").empty();

        // Loop through the results retrieved from the API
        for (var i = 0; i < response.hits.length; i++) {
            // Create a new card
            var card = $("<div>").addClass("card");
            card.attr("role", "listitem");
            var blurDimImg = $("<div>").addClass("blurring dimmable image");
            var uiDimmer = $("<div>").addClass("ui dimmer");
            var content = $("<div>").addClass("content");
            var center = $("<div>").addClass("center");
            var seeRecipeButton = $("<div>").addClass("ui inverted button recipeButton").text("See Recipe").attr('id', 'recipeButton').attr("role", "button");
            var saveRecipeButton = $("<div>").addClass("ui inverted button").text("Save Recipe").attr("role", "button");
            center.append(seeRecipeButton, saveRecipeButton);
            content.append(center);
            uiDimmer.append(content);
            blurDimImg.append(uiDimmer);
            var img = $("<img>").attr("alt", response.hits[i].recipe.label).attr("src", response.hits[i].recipe.image);
            blurDimImg.append(img);
            card.append(blurDimImg);
            var content2 = $("<div>").addClass("content");
            var header = $("<a>").addClass("recipe-title-link").text(response.hits[i].recipe.label).attr("href", response.hits[i].recipe.url);
            var meta = $("<div>").addClass("meta");
            var span = $("<span>").addClass("text").text("from " + response.hits[i].recipe.source);
            meta.append(span);
            content2.append(header, meta);
            card.append(content2);

            // Append the card to the search results area
            $("#previewCards").append(card);
        }
        
        // Enable dimmer effect for search result images
        $('.special.cards .image').dimmer({
            on: 'hover'
        });

        // Show the search results
        $("#previewCards").show();

        // Set focus to the first search result in the list
        setTimeout(function() {
            $("a:first").focus();
        }, 500);
    });

}

$("#recipeButton").click(function () {
    console.log("good job")
});


function getNutrition(ingredients) {
    var queryUrl = "http://api.edamam.com/api/nutrition-details?app_id=" + nutritionAppID + "&app_key=" + nutritionApiKey;
    $.ajax({
        url: queryUrl,
        type: "POST",
        data: {
            "title": "BLT",
            "ingr": [
                "white bread",
                "bacon",
                "lettuce",
                "tomatoes",
                "mayonnaise"
            ]
        },
        contentType: "application/json"
    }).then(function (response) {
        console.log(response);
    });
}
