myApp.controller('WorkoutDetailsController', ['$scope', '$location', '$http', 'DataFactory', function($scope, $location, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.workout = {};
  $scope.exercises = [];

  $scope.client = $scope.dataFactory.factoryReturnSelectedClient();

  $scope.dataFactory.factoryRetrieveWorkout().then(function() {
    $scope.workout = $scope.dataFactory.factoryWorkout();
    console.log('This is the workout', $scope.workout);
  });

  $scope.dataFactory.factoryRetrieveExercises().then(function() {
    $scope.exercises = $scope.dataFactory.factoryExercises();
    console.log('These are the exercises', $scope.exercises);
  });

}]);