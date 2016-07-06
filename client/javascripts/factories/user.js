app.factory('WeatherFactory', function ($http) {
	var factory = {};

	factory.weather = function (mapData, callback) {
		$http.get('/weather', {data: mapData}).success(function (output) {
			console.log(output);
			callback(output);
		})
	}

	return factory;
})