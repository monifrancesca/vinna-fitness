myApp.controller('WorkoutController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.newExercise = {};
  $scope.formData = {};
  $scope.formData.exercises = [];

  $scope.addExercise = function () {
    $scope.formData.exercises.push($scope.newExercise);
    $scope.newExercise = {};
    console.log('These are the exercises', $scope.formData.exercises);
  };

  $scope.sendForm = function() {
    console.log($scope.formData);
    $scope.dataFactory.factorySaveNewWorkout($scope.formData);
  };

}]);