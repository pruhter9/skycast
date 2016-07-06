app.controller ('WeatherController', function ($scope, UserFactory, $location, $cookieStore) {
	var my = this;

	my.queries = [];

	if ($cookieStore.get('cachedQueries')) {
		my.queries = $cookieStore.get("cachedQueries")
	}

	console.log("User Controller loaded");

	my.retrieveWeather = function(coordinate) {
		console.log("retrieving weather...");
		WeatherFactory.weather(coordinate, function(data) {
			console.log(data);
			drawHourlyGraph(data.hourly);
			drawDailyGraph(data.daily);
		});
	}

	// my.register = function () {
	// 	console.log("registering...");
	// 	UserFactory.register(my.newUser, function(data) {
	// 		console.log(data);
	// 	})
	// }

	// my.login = function () {
	// 	console.log("logging in...");
	// 	UserFactory.login(my.User, function(data) {
	// 		console.log("data returned: " + data);
	// 		$cookieStore.put('loggedIn', true);
	// 		$cookieStore.put('userId', data[0]._id);
	// 		$cookieStore.put('name', data[0].firstName + " " + data[0].lastName);
	// 		setSession();
	// 		$location.path('/dashboard');
	// 	})
	// }

});