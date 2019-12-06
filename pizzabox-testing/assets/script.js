const appID = "599eeff6";
const apiKey = "9ba899b6cf470706c026e545e7e3e1b6";

$(document).ready(function () {
    $("#search-button").click(function (event) {
        event.preventDefault();
        var searchText = $("#search-field").val().trim();
        if (searchText.length > 0) {
            showRecipes(searchText);
        }
    });
});

function showRecipes(searchParams) {
    var queryUrl = "https://api.edamam.com/search?q=" + searchParams + "&app_id=" + appID + "&app_key=" + apiKey;
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var hits = response.hits;

        $("#search-results").empty();
        for (var i = 0; i < hits.length; i++) {
            var searchResult = $("<div>");

            var label = $("<h3>").text(hits[i].recipe.label);

            var link = $("<a>").attr("href", hits[i].recipe.url);
            link.append(label);
            var img = $("<img>").attr("src", hits[i].recipe.image);
            img.attr("alt", label.text());
            img.attr("style", "width: 50px");

            searchResult.append(img);
            searchResult.append(label);
            $("#search-results").append(searchResult);
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
