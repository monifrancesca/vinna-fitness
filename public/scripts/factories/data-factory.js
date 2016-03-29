myApp.factory('DataFactory', ['$http', function($http) {

  var nameQuery = [];
  var selectedName;
  var exerciseQuery = [];
  var selectedExercise;
  var fakeIdentifier = 'a';
  var clientMedical = undefined;
  var facUserIdNumber = '1';
  var facFmsData = null;

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

  //Route to find exercise names in database that match query.
  var searchExercise = function(query) {
    var promise = $http.get('/workout/searchexercise/' + query).then(function(response) {
      exerciseQuery = response.data;
    });
    return promise;
  };

  var postMedical = function(data) {
    //console.log('factory data', data);
    $http.post('/medical/' + fakeIdentifier, data).then(function(response) {
    });
  };

  var getMedical = function() {
    //console.log('getMedical in factory fired');
    var promise = $http.get('/medical/' + fakeIdentifier).then(function(response) {
      clientMedical = response.data;
      //console.log('clientMedical', clientMedical);
    });
    return promise;
  };
  var facPostFmsData = function(data) {
    console.log('posting fms data');
    var promise = $http.post('/fms', data).then(function(response) {
      console.log('match data saved');
      console.log(response);
    });
    return promise;
  };
  var facGetFmsData = function() {
    console.log('getting data from server for id: ', facUserIdNumber);
    var promise = $http.get('/fms/' + facUserIdNumber).then(function (response) {
      facFmsData = response.data;
      console.log('Async data response:', facFmsData);
    });
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
    factorySearchExercise: function(query) {
      return searchExercise(query);
    },
    factoryExerciseQuery: function() {
      return exerciseQuery;
    },
    factoryGetExerciseId: function(id){
      selectedExercise = id;
      return selectedExercise;
    }, sendMedical: function(history) {
      //console.log('in the factory', history)
      postMedical(history);
    },
    retrieveMedical: function() {
      return getMedical();
    },
    clientInfo: function() {
      return clientMedical;
    },
    postFmsData: function(data){
      return facPostFmsData(data);
    },
    getFmsData: function() {
      return facGetFmsData();
    }
  };

  return dataFactoryOutput;

}]);