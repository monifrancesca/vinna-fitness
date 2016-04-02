var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    })
    .when('/admin', {
      templateUrl: '/views/templates/admin.html',
      controller: 'AdminController'
    })
    .when('/adminclasses', {
      templateUrl: '/views/templates/admin-classes.html',
      controller: 'AdminController'
    })
    .when('/adminclients', {
      templateUrl: '/views/templates/admin-clients.html',
      controller: 'AdminController'
    })
    .when('/adminexercises', {
      templateUrl: '/views/templates/admin-exercises.html',
      controller: 'AdminController'
    })
    .when('/adminlocation', {
      templateUrl: '/views/templates/admin-location.html',
      controller: 'AdminController'
    })
    .when('/adminmanage', {
      templateUrl: '/views/templates/admin-manage-admins.html',
      controller: 'AdminController'
    })
    .when('/admintrainers', {
      templateUrl: '/views/templates/admin-trainers.html',
      controller: 'AdminController'
    })
    .when('/client', {
      templateUrl: '/views/templates/client-dashboard.html',
      controller: 'ClientController'
    })
    .when('/existingclient', {
      templateUrl: '/views/templates/existing-client-dashboard.html',
      controller: 'ClientController'
    })
    .when('/newclient', {
      templateUrl: '/views/templates/new-client-dashboard.html',
      controller: 'ClientController'
    })
    .when('/fms', {
      templateUrl: '/views/templates/fms.html',
      controller: 'FMSController'
    })
    .when('/medical', {
      templateUrl: '/views/templates/medical-history.html',
      controller: 'MedicalController'
    })
    .when('/personal', {
      templateUrl: '/views/templates/personal-info.html',
      controller: 'PersonalController'
    })
    .when('/workoutmain', {
      templateUrl: '/views/templates/workout-dashboard.html',
      controller: 'WorkoutController'
    })
    .when('/workout', {
      templateUrl: '/views/templates/workout.html',
      controller: 'WorkoutController'
    })
    .otherwise({
        redirectTo: 'login'
    });
}]);
