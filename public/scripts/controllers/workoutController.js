myApp.controller('WorkoutController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.newExercise = {};
  $scope.formData = {};
  $scope.formData.exercises = [];

  $scope.searchName = undefined;
  $scope.names = [];
  $scope.exerciseResults = [];

  $scope.nameQuery = function() {
    var query = $scope.searchName;
    if (query.length >= 1) {
      console.log('This is the query', query);
      $scope.dataFactory.factorySearchClient(query).then(function() {
        $scope.names = $scope.dataFactory.factoryNameQuery();
        console.log('These are the results', $scope.names);
      });
    }
    else {
      $scope.names = [];
    }
  };

  $scope.selectName = function(id, firstName, lastName){
    $scope.searchName = firstName + ' ' + lastName;
    $scope.names = [];
    $scope.formData.client_id = $scope.dataFactory.factoryGetClientId(id);
  };

  $scope.exerciseQuery = function() {
    var query = $scope.newExercise.exercisename;
    if (query.length >= 1) {
      console.log('This is the query', query);
      $scope.dataFactory.factorySearchExercise(query).then(function() {
        $scope.exerciseResults = $scope.dataFactory.factoryExerciseQuery();
        console.log('These are the results', $scope.exerciseResults);
      });
    }
    else {
      $scope.exercises = [];
    }
  };

  $scope.selectExercise = function(id, name){
    $scope.newExercise.exercisename = name;
    $scope.exerciseResults = [];
    $scope.newExercise.exercise_id = $scope.dataFactory.factoryGetExerciseId(id);
  };

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