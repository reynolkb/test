var cityLon;
var cityLat;
var restaurantOneLon;
var restaurantOneLat;
var restaurantTwoLon;
var restaurantTwoLat;

function city() {
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=+Beverly+Hills,+CA&key=AIzaSyCv_iF_YniNOH9mI6WvJc66w5bo3_PXXCg")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityLon = data.results[0].geometry.location.lng;
            cityLat = data.results[0].geometry.location.lat;
            console.log(cityLon, cityLat);
            tripAdvisor(cityLon, cityLat);
        })
        .catch(function (error) {
            console.log(error);
        })

}

function tripAdvisor(cityLon, cityLat) {
    fetch("https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=30&currency=USD&distance=2&lunit=km&lang=en_US&latitude=" + cityLat + "&longitude=" + cityLon, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
            "x-rapidapi-key": "693350c65dmsh5ad1865d9215e1dp1a9131jsn53d32f4069ff"
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            console.log(data.data[0], data.data[1]);
            restaurantOneLon = data.data[0].longitude;
            restaurantOneLat = data.data[0].latitude;
            restaurantTwoLon = data.data[1].longitude;
            restaurantTwoLat = data.data[1].latitude;

            directions(restaurantOneLon, restaurantOneLat, restaurantTwoLon, restaurantTwoLat)
        })
        .catch(err => {
            console.log(err);
        });
}

function directions(restaurantOneLon, restaurantOneLat, restaurantTwoLon, restaurantTwoLat) {
    var apiUrl = "https://maps.googleapis.com/maps/api/directions/json?origin=" + restaurantOneLat + "," + restaurantOneLon + "&destination=" + restaurantTwoLat + "," + restaurantTwoLon + "&key=AIzaSyCv_iF_YniNOH9mI6WvJc66w5bo3_PXXCg";
    var corsAnywhere = "https://cors-anywhere.herokuapp.com/";

    fetch(corsAnywhere + apiUrl)
        .then(function (response) {
            response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}

city();