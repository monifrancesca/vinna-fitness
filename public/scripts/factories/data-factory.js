myApp.factory('DataFactory', ['$http', function($http) {

  var nameQuery = [];
  var selectedName;

//Build a function that sends a new workout instance to database where relevant info can be saved to the
//the workout table and workout_line_items table.

  var saveNewWorkout = function(workout) {
    console.log('This is the workout we are sending to the server:', workout);
    $http.post('/workout', workout).then(function(response) {
    });
  };

  //Route to find client names in database that match query.
  var searchClient = function(query) {
    var promise = $http.get('/workout/searchname/' + query).then(function(response) {
      nameQuery = response.data;
    });
    return promise;
  };





  var dataFactoryOutput = {
    factorySaveNewWorkout: function(workout) {
      return saveNewWorkout(workout);
    },
    factorySearchClient: function(query) {
      return searchClient(query);
    },
    factoryNameQuery: function() {
      return nameQuery;
    },
    factoryGetClientId: function(id){
      selectedName = id;
      return selectedName;
    },
  };

  return dataFactoryOutput;

}]);