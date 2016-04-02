myApp.controller('AdminExerciseController', ['$scope', '$location', '$http', 'DataFactory', function($scope, $location, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.exercises = [];

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
    var newExercise = {
      name: $scope.exerciseName,
      category: $scope.exerciseCategory
    };

    $scope.dataFactory.factoryAddExercise(newExercise);
    $scope.dataFactory.factoryRetrieveAllExercises().then(function() {
      $scope.exercises = $scope.dataFactory.factoryAllExercises();
    });

    $scope.exerciseName = '';
    $scope.exerciseCategory = '';
  }

}]);