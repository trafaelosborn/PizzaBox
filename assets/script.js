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

        // Hide the info div
        $("#recipeNutritionCard").hide();

        // Clear the search results div
        $("#previewCards").empty();

        // Loop through the results retrieved from the API
        for (var i = 0; i < response.hits.length; i++) {
            // Create a new card
            var card = $("<div>").addClass("card");

            // Role for screen reader compatibility
            card.attr("role", "listitem");

            // Elements needed for visual image effects
            var blurDimImg = $("<div>").addClass("blurring dimmable image");
            var uiDimmer = $("<div>").addClass("ui dimmer");
            blurDimImg.append(uiDimmer);

            var img = $("<img>").attr("alt", response.hits[i].recipe.label).attr("src", response.hits[i].recipe.image);

            // Save the URI for each recipe so details can be displayed when this result is clicked
            img.attr("data-uri", encodeURIComponent(response.hits[i].recipe.uri));

            // These aid in screen reader compatibility
            img.attr("role", "button");
            img.attr("tabindex", "0");

            // Define click handler for image
            img.click(function(event) {
                event.preventDefault();
                getInfo($(this).attr("data-uri"));
            });
            blurDimImg.append(img);
            card.append(blurDimImg);
            var content = $("<div>").addClass("content");
            var header = $("<span>").addClass("recipe-title-link").text(response.hits[i].recipe.label);
            var meta = $("<div>").addClass("meta");
            var span = $("<span>").addClass("text").text("from " + response.hits[i].recipe.source);
            meta.append(span);
            content.append(header, meta);
            card.append(content);

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
            $("img:first").focus();
        }, 500);
    });
}

function getInfo(recipeUri) {
    var queryUrl = "https://api.edamam.com/search?r=" + recipeUri + "&app_id=" + recipeAppID + "&app_key=" + recipeApiKey;
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // Show the info div
        $("#recipeNutritionCard").show();

        // Show image
        $("#mainImg").attr("src", response[0].image);
        $("#mainImg").attr("alt", response[0].label);

        // Show heading
        $("#recipeTitle").text(response[0].label);

        // Show ingredients
        $("#ingredients").empty();
        for (var i = 0; i < response[0].ingredientLines.length; i++) {
            var ingrDiv = $("<div>").addClass("item");
            ingrDiv.text(response[0].ingredientLines[i]);
            ingrDiv.attr("role", "listitem");

            $("#ingredients").append(ingrDiv);
        }

        // Display the nutrition info
        $("#calories").text(response[0].calories.toFixed(1));

        var carbQty = response[0].totalNutrients.CHOCDF.quantity.toFixed(1);
        var carbUnits = response[0].totalNutrients.CHOCDF.unit;
        $("#carbs").text(carbQty + " " + carbUnits);

        var fatQty = response[0].totalNutrients.FAT.quantity.toFixed(1);
        var fatUnits = response[0].totalNutrients.FAT.unit;
        $("#fat").text(fatQty + " " + fatUnits);

        var fiberQty = response[0].totalNutrients.FIBTG.quantity.toFixed(1);
        var fiberUnits = response[0].totalNutrients.FIBTG.unit;
        $("#fiber").text(fiberQty + " " + fiberUnits);
    });
}