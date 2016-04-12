myApp.controller('WorkoutController', ['$scope', '$location', '$http', 'DataFactory', function($scope, $location, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.newExercise = {};
  $scope.formData = {};
  $scope.formData.exercises = [];
  $scope.formData.class_type = $scope.dataFactory.factoryCurrentClass();
  $scope.locations = [];
  $scope.searchName = {};
  $scope.searchExercise = {};
  $scope.names = [];
  $scope.exerciseResults = [];
  $scope.showBasic = true;
  $scope.showReps = false;
  $scope.showTime = false;
  $scope.showDistance = false;
  $scope.showKg = false;
  $scope.showLb = false;
  $scope.formData.date = new Date();


  $scope.dataFactory.getLocation().then(function(){
    $scope.locations = $scope.dataFactory.getLocationVariable();
  });

  $scope.loadNames = function($query) {
    var query = $query;
    return $http.get('/workout/searchname/' + query).then(function(response) {
      var names = response.data;
      return names.filter(function(name) {
        name.fullName = name.first_name + ' ' + name.last_name;
        return name.fullName.toLowerCase().indexOf($query.toLowerCase()) != -1;
      });
    });
  };

  $scope.addName = function(name) {
    $scope.names.push(name.id);
  };

  $scope.removeName = function(name) {
    var index = $scope.names.indexOf(name.id);
    if (index > -1) {
      $scope.names.splice(index, 1);
    }
  };

  //$scope.loadExercises = function($query) {
  //  var query = $query;
  //  return $http.get('/workout/searchexercise/' + query).then(function(response) {
  //    var exercises = response.data;
  //    console.log(exercises);
  //    return exercises.filter(function(exercise) {
  //      //name.fullName = name.first_name + ' ' + name.last_name;
  //      return exercise.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
  //    });
  //  });
  //};
  //
  //$scope.selectExercise = function(exercise) {
  //  $scope.newExercise.exercisename = exercise.name;
  //  $scope.newExercise.exercise_id = exercise.id;
  //  console.log ('This is the new exercise', $scope.newExercise);
  //};
  //
  //$scope.removeExercise = function(exercise) {
  //  $scope.newExercise.exercisename = undefined;
  //  $scope.newExercise.exercise_id = undefined;
  //  console.log ('This is the new exercise', $scope.newExercise);
  //
  //};

  $scope.exerciseQuery = function() {
    var query = $scope.newExercise.exercisename;
    if (query.length >= 1) {
      $scope.dataFactory.factorySearchExercise(query).then(function() {
        $scope.exerciseResults = $scope.dataFactory.factoryExerciseQuery();
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
    }
    $scope.formData.exercises.push($scope.newExercise);
    resetNewExercise();
  };

  $scope.sendForm = function() {
    for (var i = 0; i < $scope.names.length; i++) {
      $scope.dataFactory.factorySaveNewWorkout($scope.formData, $scope.names[i]);
    }
    $scope.searchName.query = '';
    $scope.exercises = [];
    $scope.formData = {};
    $scope.myAccordion = 1;
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