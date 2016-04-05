myApp.controller('WorkoutController', ['$scope', '$location', '$http', 'DataFactory', function($scope, $location, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.newExercise = {};
  $scope.formData = {};
  $scope.formData.exercises = [];
  $scope.formData.class_type = $scope.dataFactory.factoryCurrentClass();

  $scope.searchName = {};
  $scope.names = [];
  $scope.exerciseResults = [];
  $scope.showBasic = true;
  $scope.showReps = false;
  $scope.showTime = false;
  $scope.showDistance = false;
  $scope.showKg = false;
  $scope.showLb = false;

  $scope.nameQuery = function() {
    var query = $scope.searchName.query;
    console.log('name query', query);
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
    $scope.searchName.query = firstName + ' ' + lastName;
    $scope.names = [];
    $scope.formData.client_id = $scope.dataFactory.factoryGetClientId(id);
  };

  $scope.exerciseQuery = function() {
    var query = $scope.newExercise.exercisename;
    console.log('exercise query', query);
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
    if ($scope.newExercise.minutes != null) {
      if ($scope.newExercise.seconds == null) {
        $scope.newExercise.seconds = 0;
      }
      $scope.newExercise.seconds += ($scope.newExercise.minutes * 60);
      $scope.newExercise.minutes = null;
      console.log('Seconds: ', $scope.newExercise.seconds);
    }
    $scope.formData.exercises.push($scope.newExercise);
    resetNewExercise();
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
    resetNewExercise();
  };

  $scope.makeWarmUpActive = function() {
    $scope.showBasic = false;
    $scope.showWarmUp = true;
    $scope.showExercises = false;
    $scope.showWrapUp = false;
    $scope.section = 1;
    resetNewExercise();
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
    resetNewExercise();
  };

  $scope.showKgIntensity = function() {
    $scope.showKg = true;
    $scope.showLb = false;
    $scope.newExercise.intensity_lbs = null;
  };

  $scope.showLbIntensity = function() {
    $scope.showKg = false;
    $scope.showLb = true;
    $scope.newExercise.intensity_kgs = null;
  };

  $scope.showUnits = function() {
    console.log('This is the measurement', $scope.newExercise.measurement);
    if ($scope.newExercise.measurement == '#') {
      $scope.newExercise.minutes = null;
      $scope.newExercise.seconds = null;
      $scope.newExercise.distance = null;
      $scope.showReps = true;
      $scope.showTime = false;
      $scope.showDistance = false;
    } else if ($scope.newExercise.measurement == 'time') {
      $scope.newExercise.number = null;
      $scope.newExercise.distance = null;
      $scope.showReps = false;
      $scope.showTime = true;
      $scope.showDistance = false;
    } else if ($scope.newExercise.measurement == 'distance') {
      $scope.newExercise.minutes = null;
      $scope.newExercise.seconds = null;
      $scope.newExercise.number = null;
      $scope.showReps = false;
      $scope.showTime = false;
      $scope.showDistance = true;
    }
  };

  function resetNewExercise() {
    $scope.newExercise = {};
    $scope.showReps = false;
    $scope.showTime = false;
    $scope.showDistance = false;
    $scope.showKg = false;
    $scope.showLb = false;
    $scope.newExercise.measurement;
  }

}]);