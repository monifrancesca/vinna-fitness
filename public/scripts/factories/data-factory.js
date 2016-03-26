myApp.factory('DataFactory', ['$http', function($http) {

//Build a function that sends a new workout instance to database where relevant info can be saved to the
//the workout table and workout_line_items table.

  var saveNewWorkout = function(workout) {
    console.log('This is the workout we are sending to the server:', workout);
    //$http.post('/workout', workout).then(function(response) {
    //});
  };





  var dataFactoryOutput = {
    factorySaveNewWorkout: function(workout) {
      return saveNewWorkout(workout);
    }
  };

  return dataFactoryOutput;

}]);