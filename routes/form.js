var express = require('express');
var router = express.Router();

var NodeGeocoder = require('node-geocoder');
var http = require("http");

var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https',
    apiKey: 'AIzaSyDJtdmnzbzoqydZt6sX-rQtsVob7JXERMc',
    formatter: null
};

var geocoder = NodeGeocoder(options);

var getLocation = function(searchQuery) {
    geocoder.geocode('De Admirant, Eindhoven')
        .then(function(res) {
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 44.540, lng: -78.546},
        zoom: 8
    });
};



/* GET Form page. */
router.get('/', function(req, res, next) {

    function requestMap(){
        var maps_api = {
            host: "maps.googleapis.com",
            path: "/maps/api/js?key=AIzaSyDJtdmnzbzoqydZt6sX-rQtsVob7JXERMc"
        }

        http.get(maps_api, function(res){
            console.log(res);
            //initMap(?);
        });
    };

    res.render('form', { title: 'Meld een crisis'/*, requestMap: requestMap()*/});
});

module.exports = router;