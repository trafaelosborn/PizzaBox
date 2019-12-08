const appID = "599eeff6";
const apiKey = "9ba899b6cf470706c026e545e7e3e1b6";
const maxHits = 12; // Change this to however many hits you want the page to display after a search

$(document).ready(function () {

    $("#previewCards").hide();
    $("#recipeNutritionCard").hide();

    $("#searchButton").click(function(event) {
        event.preventDefault();

        var searchText = $("#searchField").val().trim();

        if (searchText.length > 0) {
            getRecipes(searchText);
        } else {
            // To-do: replace this alert with a nicer modal
            alert("Search field cannot be blank.");
        }
    });

    $('.special.cards .image').dimmer({
        on: 'hover'
    });
});

function getRecipes(searchText) {
    var queryUrl = "https://api.edamam.com/search?q=" + searchText + "&app_id=" + appID + "&app_key=" + apiKey + "&from=0&to=" + maxHits;
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $("#previewCards").empty();
        for (var i = 0; i < response.hits.length; i++) {
            var card = $("<div>").addClass("card");
                var blurDimImg = $("<div>").addClass("blurring dimmable image");
                    var uiDimmer = $("<div>").addClass("ui dimmer");
                        var content = $("<div>").addClass("content");
                            var center = $("<div>").addClass("center");
                                var seeRecipeButton = $("<div>").addClass("ui inverted button").text("See Recipe");
                                var saveRecipeButton = $("<div>").addClass("ui inverted button").text("Save Recipe");
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

            $("#previewCards").append(card);
            $("#previewCards").show();
            $('.special.cards .image').dimmer({
                on: 'hover'
            });
        }
    });
}

function getNutrition(ingredients) {
    var queryUrl = "https://api.edamam.com/api/nutrition-data?app_id=" + appID + "&app_key=" + apiKey + "&ingr=1%20large%20apple";
    $.ajax({
        url: queryUrl,
        method: "POST",
    }).then(function (response) {
        console.log(response);
    });

    $('#previewCards .image').dimmer({
        on: 'hover'
        });
}
