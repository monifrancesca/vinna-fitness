var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/main', {
      templateUrl: '/views/templates/login-dashboard.html',
      controller: 'LoginController'
    })
    .when('/admin', {
      templateUrl: '/views/templates/admin.html',
      controller: 'AdminController'
    })
    .when('/adminclasses', {
      templateUrl: '/views/templates/admin-classes.html',
      controller: 'AdminClassController'
    })
    .when('/adminclients', {
      templateUrl: '/views/templates/admin-clients.html',
      controller: 'AdminClientController'
    })
    .when('/adminexercises', {
      templateUrl: '/views/templates/admin-exercises.html',
      controller: 'AdminExerciseController'
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
    .when('/personalhistory', {
      templateUrl: '/views/templates/personal-info-history.html',
      controller: 'PersonalHistoryController'
    })
    .when('/workoutmain', {
      templateUrl: '/views/templates/workout-dashboard.html',
      controller: 'WorkoutDashboardController'
    })
    .when('/workout', {
      templateUrl: '/views/templates/workout.html',
      controller: 'WorkoutController'
    })
    .when('/workouthistory', {
      templateUrl: '/views/templates/workout-history.html',
      controller: 'WorkoutHistoryController'
    })
    .when('/workoutdetails', {
      templateUrl: '/views/templates/workoutdetails.html',
      controller: 'WorkoutDetailsController'
    })
    .otherwise({
        redirectTo: 'main'
    });
}]);
