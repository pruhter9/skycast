/*Angular Routes*/
app.config(function ($routeProvider){
$routeProvider
    .when('/', {
        templateUrl : 'partials/app.html'
    })
    .otherwise('/');
});