var express = require('express');
var router = express.Router();

var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

var getLocation = function(searchQuery) {
    geocoder.geocode(searchQuery)
        .then(function(res) {
            res.add
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        });
}

/* GET Form page. */
router.get('/', function(req, res, next) {
    res.render('form', { title: 'Meld een crisis' });
});

module.exports = router;