myApp.controller('WorkoutController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.newExercise = {};
  $scope.formData = {};
  $scope.formData.exercises = [];

  $scope.searchName = undefined;
  $scope.names = [];
  $scope.exerciseResults = [];
  $scope.showBasic = true;
  $scope.showReps = false;
  $scope.showTime = false;
  $scope.showDistance = false;

  console.log('This is the value of the newExercise.measurement', $scope.newExercise.measurement)

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
      $scope.exerciseResults = [];
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

  $scope.makeBasicInfoActive = function() {
    $scope.showBasic = true;
    $scope.showWarmUp = false;
    $scope.showExercises = false;
    $scope.showWrapUp = false;
    $scope.section = 0;
  };

  $scope.makeWarmUpActive = function() {
    $scope.showBasic = false;
    $scope.showWarmUp = true;
    $scope.showExercises = false;
    $scope.showWrapUp = false;
    $scope.section = 1;
  };

  $scope.makeExercisesActive = function() {
    $scope.showBasic = false;
    $scope.showWarmUp = false;
    $scope.showExercises = true;
    $scope.showWrapUp = false;
    $scope.section = 2;
  };

  $scope.makeWrapUpActive = function() {
    $scope.showBasic = false;
    $scope.showWarmUp = false;
    $scope.showExercises = false;
    $scope.showWrapUp = true;
    $scope.section = 3;
  };

  $scope.showUnits = function() {
    console.log('This is the measurement', $scope.newExercise.measurement);
    if ($scope.newExercise.measurement == '#') {
      $scope.showReps = true;
      $scope.showTime = false;
      $scope.showDistance = false;
    } else if ($scope.newExercise.measurement == 'time') {
      $scope.showReps = false;
      $scope.showTime = true;
      $scope.showDistance = false;
    } else if ($scope.newExercise.measurement == 'distance') {
      $scope.showReps = false;
      $scope.showTime = false;
      $scope.showDistance = true;
    }
  };

}]);