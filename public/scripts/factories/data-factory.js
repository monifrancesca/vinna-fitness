myApp.factory('DataFactory', ['$http', function($http) {

  //PRIVATE

  var nameQuery = [];
  var selectedName;
  var exerciseQuery = [];
  var selectedExercise;
  var fakeIdentifier = 3;
  var clientMedical = undefined;
  var facUserIdNumber = '1';
  var facFmsData = null;
  var clientPersonal = undefined;
  var selectedWorkout = undefined;
  var classList = [];
  var currentClass = undefined;
  var workouts = [];
  var workout = {};
  var selectedClient = {first_name: "Test", last_name: "Person", id: 2};

//Build a function that sends a new workout instance to database where relevant info can be saved to the
//the workout table and workout_line_items table.

  var saveNewWorkout = function(workout) {
    console.log('This is the workout we are sending to the server:', workout);
    $http.post('/workout', workout).then(function(response) {
    });
  };

  var fillClassList = function () {
    var promise = $http.get('/workout/classlist/').then(function(response) {
    classList = response.data;
        console.log(classList);
    });
    return promise;
  };

  var retrieveWorkouts = function() {
    var promise = $http.get('/workout/history/' + selectedClient.id).then(function (response) {
      workouts = response.data;
    });
    return promise;
  };

  var retrieveWorkout = function() {
    var promise = $http.get('/workout/detail/' + selectedWorkout).then(function (response) {
      workout = response.data[0];
    });
    return promise;
  };

  // working on this
  var postPersonal = function(data) {
    console.log('factory data', data);
    $http.post('/personal/', data).then(function(response) {
    });
  };

  //var getPersonal = function() {
  //  console.log('getPersonal in factory fired');
  //  var promise = $http.get('/personal/' + fakeIdentifier).then(function(response) {
  //    clientPersonal = response.data;
  //    console.log('clientPersonal', clientPersonal);
  //  });
  //  return promise;
  //};

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
    $http.post('/medical/' + fakeIdentifier, data).then(function(response) {
        console.log(response);
    });
  };

  var getMedical = function() {
    var promise = $http.get('/medical/' + fakeIdentifier).then(function(response) {
      clientMedical = response.data;
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

    var updateClassList = function() {
        console.log('update class list in factory')
    };

  //PUBLIC

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
    },
      sendMedical: function(history) {
      postMedical(history);
    },
    retrieveMedical: function() {
      return getMedical();
    },
    clientMedicalInfo: function() {
      return clientMedical;
    },
    postFmsData: function(data){
      return facPostFmsData(data);
    },
    getFmsData: function() {
      return facGetFmsData();
    },
    sendPersonal: function(info) {
      console.log('in the factory', info);
      postPersonal(info);
    },
    //retrievePersonal: function() {
    //  return getPersonal();
    //},
    clientInfo: function() {
      return clientPersonal;
    },
    factoryGetWorkout: function(id) {
      selectedWorkout = id;
      return selectedWorkout;
    },
    factoryGetClassList: function() {
      return fillClassList();
    },
    factoryClasses: function() {
      return classList;
    },
    factoryStartClass: function(id) {
      currentClass = id;
      console.log('This is the currentClass', id);
      return currentClass;
    },
    factoryCurrentClass: function() {
      return currentClass;
    },
    factoryRetrieveWorkouts: function() {
      return retrieveWorkouts();
    },
    factoryWorkouts: function() {
      return workouts;
    },
    factoryRetrieveWorkout: function() {
      return retrieveWorkout();
    },
    factoryWorkout: function() {
      return workout;
    },
    factoryReturnSelectedClient: function() {
      return selectedClient;
    },
      adminRemoveClass: function() {
          return updateClassList();
      }
  };

  return dataFactoryOutput;

}]);