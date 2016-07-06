var apiKey = "683394f37babcebe7947e6d56a9c0252",
	skykast = "https://api.forecast.io/forecast/";
var request = require('request');

module.exports = (function() {
	return {
		retrieve: function (req, res) {
			var location = req.body.data;
			var reqUrl = skykast + apiKey + location.lat() + "," + location.lng();
			request(reqUrl, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    console.log(response)
			  }
			})
		}
	}
})();