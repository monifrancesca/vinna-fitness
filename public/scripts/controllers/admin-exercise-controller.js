myApp.controller('AdminExerciseController', ['$scope', '$location', '$http', 'DataFactory', function($scope, $location, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.exercises = [];

  $scope.newExercise = {};

  $scope.dataFactory.factoryRetrieveAllExercises().then(function() {
    $scope.exercises = $scope.dataFactory.factoryAllExercises();
  });

  $scope.makeExerciseActive = function(id) {
    $scope.dataFactory.factoryMakeExerciseActive(id);
    $scope.dataFactory.factoryRetrieveAllExercises().then(function() {
      $scope.exercises = $scope.dataFactory.factoryAllExercises();
    });
  };

  $scope.makeExerciseInactive = function(id) {
    $scope.dataFactory.factoryMakeExerciseInactive(id);
    $scope.dataFactory.factoryRetrieveAllExercises().then(function() {
      $scope.exercises = $scope.dataFactory.factoryAllExercises();
    });
  };

  $scope.addNewExercise = function() {
    console.log('This is the New Exercise:', $scope.newExercise);
    $scope.dataFactory.factoryAddExercise($scope.newExercise);
    $scope.dataFactory.factoryRetrieveAllExercises().then(function() {
      $scope.exercises = $scope.dataFactory.factoryAllExercises();
      $scope.newExercise.exerciseName = '';
      $scope.newExercise.exerciseCategory = '';
    });
  }

}]);