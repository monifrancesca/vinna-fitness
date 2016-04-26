var myApp = angular.module('myApp', ['ngRoute', 'mobile-angular-ui', 'ngTagsInput']);

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
    .when('/admintrainers', {
      templateUrl: '/views/templates/admin-trainers.html',
      controller: 'AdminController'
    })
      .when('/edittrainers', {
        templateUrl: '/views/templates/admin-edit-trainers.html',
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
    .when('/existingFms', {
      templateUrl: '/views/templates/existing-fms.html',
      controller: 'ExistingFMSController'
    })
    .when('/fmsDetails', {
      templateUrl: '/views/templates/fms-details.html',
      controller: 'FmsDetailsController'
    })
    .when('/medical', {
      templateUrl: '/views/templates/medical-history.html',
      controller: 'MedicalController'
    })
      .when('/newmedical', {
        templateUrl: '/views/templates/medical-new.html',
        controller: 'NewMedicalController'
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
        redirectTo: 'login'
    });
}]);
