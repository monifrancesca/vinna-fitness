myApp.controller('WorkoutController', ['$scope', '$location', '$http', 'DataFactory', 'AuthFactory', '$window', function($scope, $location, $http, DataFactory, AuthFactory, $window) {

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

  //Checks if user is logged in
  var authFactory = AuthFactory;
  authFactory.isLoggedIn().then(function (response) {
    if (!response.data.status) {
      $window.location.href = '/';
    } else {
    }
  });

  //Resets "existing client" in database to prevent errors
  $scope.dataFactory.factoryResetClient();

  //gets the class list from the database and populates a list of class types for the user to choose from
  $scope.dataFactory.factoryGetClassList().then(function() {
    $scope.classes = $scope.dataFactory.factoryClasses();
    console.log($scope.classes);
  });

  //checks all locations available in the database and populates a list of radio buttons, one per location.
  $scope.dataFactory.getLocation().then(function(){
    $scope.locations = $scope.dataFactory.getLocationVariable();
  });

  //This function controls the client name search
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

  //This function controls adds a client to the workout
  $scope.addName = function(name) {
    $scope.names.push(name.id);
  };

  //This function controls removes a client from the workout
  $scope.removeName = function(name) {
    var index = $scope.names.indexOf(name.id);
    if (index > -1) {
      $scope.names.splice(index, 1);
    }
  };

  //This function controls the exercise search
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

  //This function controls what happens when you select a specific exercise from the search results
  $scope.selectExercise = function(id, name){
    $scope.newExercise.exercisename = name;
    $scope.exerciseResults = [];
    $scope.newExercise.exercise_id = $scope.dataFactory.factoryGetExerciseId(id);
  };

  //This functions adds a new exercise to the workout
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

  //This function submits the form and saves it to the clients workout history
  $scope.sendForm = function() {
    for (var i = 0; i < $scope.names.length; i++) {
      $scope.dataFactory.factorySaveNewWorkout($scope.formData, $scope.names[i]);
    }
    $scope.searchName.query = '';
    $scope.exercises = [];
    $scope.formData = {};
    $scope.myAccordion = 1;
  };

  //Controls which input boxes are shown when an intensity type is selected
  $scope.showIntensity = function() {
    if ($scope.newExercise.weight == "kgs") {
      $scope.showKg = true;
      $scope.showLb = false;
      $scope.newExercise.intensity_lbs = null;
    } else if ($scope.newExercise.weight == "lbs") {
      $scope.showKg = false;
      $scope.showLb = true;
      $scope.newExercise.intensity_kgs = null;
    } else if ($scope.newExercise.weight == "body") {
      $scope.showKg = false;
      $scope.showLb = false;
      $scope.newExercise.intensity_kgs = null;
      $scope.newExercise.intensity_lbs = null;
    } else if ($scope.newExercise.weight == "") {
      $scope.showKg = false;
      $scope.showLb = false;
      $scope.newExercise.intensity_kgs = null;
      $scope.newExercise.intensity_lbs = null;
    }
  };

  //Controls which input boxes are shown when a rep unit type is selected
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

  //Resets all input boxes related to a new exercise
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