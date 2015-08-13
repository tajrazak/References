//Angular Routes
var app = angular.module("app", ['ngRoute'])
app.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'testing.html',
    }).when('/login', {
      templateUrl: 'loginPage.html'
    }).when('/home', {
      templateUrl: 'home.html',
    }).otherwise({
      redirectTo: '/'
    })
}])