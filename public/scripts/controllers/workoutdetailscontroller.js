myApp.controller('WorkoutDetailsController', ['$scope', '$location', '$http', 'DataFactory', 'AuthFactory', '$window', function($scope, $location, $http, DataFactory, AuthFactory, $window) {

  var authFactory = AuthFactory;
  authFactory.isLoggedIn().then(function (response) {
    if (!response.data.status) {
      $window.location.href = '/';
    } else {
  $scope.dataFactory = DataFactory;

  $scope.workout = {};
  $scope.exercises = [];

  $scope.client = $scope.dataFactory.factoryReturnSelectedClient();

  if ($scope.dataFactory.factoryCheckWorkout() == undefined) {
    $location.path('workouthistory');
  } else {
    $scope.dataFactory.factoryRetrieveWorkout().then(function() {
      $scope.workout = $scope.dataFactory.factoryWorkout();
      console.log('This is the workout', $scope.workout);
    });

    $scope.dataFactory.factoryRetrieveExercises().then(function() {
      $scope.exercises = $scope.dataFactory.factoryExercises();
      console.log('These are the exercises', $scope.exercises);
    });
  }
    }});
}]);