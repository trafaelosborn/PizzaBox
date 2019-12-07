const appID = "599eeff6";
const apiKey = "9ba899b6cf470706c026e545e7e3e1b6";

$(document).ready(function () {
    $('.special.cards .image').dimmer({
        on: 'hover'
    });
});

function getRecipes(searchParams) {
    var queryUrl = "https://api.edamam.com/search?q=chicken&app_id=" + appID + "&app_key=" + apiKey + "&from=0&to=3&calories=591-722&health=alcohol-free";
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
                var img = $("<img>").attr("alt", hits[i].recipe.label).attr("src", hits[i].recipe.image);
                blurDimImg.append(img);
            card.append(blurDimImg);
            var content2 = $("<div>").addClass("content");
                var header = $("<a>").addClass("recipe-title-link").text(hits[i].recipe.label);
                    var meta = $("<div>").addClass("meta");
                        var span = $("<span>").addClass("text").text(hits[i].recipe.label);
                    meta.append(span);
                content2.append(header, meta);
            card.append(content2);

            $("#previewCards").append(card);
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
}
