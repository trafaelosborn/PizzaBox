const appID = "599eeff6";
const apiKey = "9ba899b6cf470706c026e545e7e3e1b6";

$(document).ready(function () {
    getNutrition();
});

function getRecipe(searchParams) {
    var queryUrl = "https://api.edamam.com/search?q=chicken&app_id=" + appID + "&app_key=" + apiKey + "&from=0&to=3&calories=591-722&health=alcohol-free";
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
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
