myApp.factory('DataFactory', ['$http', function($http) {

  //PRIVATE

  var nameQuery = [];
  var exerciseQuery = [];
  var selectedExercise;
  var fakeIdentifier = 1;
  var clientMedical = undefined;
  var facUserIdNumber = '1';
  var facFmsData = null;
  var clientPersonal = undefined;
  var personalInfoId;
  var selectedWorkout = undefined;
  var classList = [];
  var currentClass = undefined;
  var workouts = [];
  var workout = {};
  var exercises = [];
  var location = undefined;
  var selectedClient = {present: false};
  var facTrainerList = [];
  var facFMScreens = [];
  var facFMScreen = {};
  var facSelectedFMS = undefined;
  var clients = [];
  var allExercises = [];
  var flags = undefined;

//Build a function that sends a new workout instance to database where relevant info can be saved to the
//the workout table and workout_line_items table.

  var saveNewWorkout = function(workout, client) {
    console.log(workout);
    $http.post('/workout/' + client, workout).then(function(response) {
    });
  };

  var fillClassList = function () {
    var promise = $http.get('/workout/classlist/').then(function(response) {
    classList = response.data;
        console.log(classList);
    });
    return promise;
  };

  var facGetTrainers = function() {
    var promise = $http.get('/admin/trainers/').then(function (response) {
      facTrainerList = response.data;
    });
    return promise;
  };

  var facNewTrainer = function(data) {
    console.log('posting new trainer data');
    var promise = $http.post('/admin/trainers', data).then(function(response) {
      console.log('match data saved');
      console.log(response);
    });
    return promise;
  };

  var facUpdateTrainer = function(data) {
    console.log('updating trainer data');
    var promise = $http.put('/admin/trainers', data).then(function(response) {
      console.log('trainer updated');
      console.log(response);
    });
    return promise;
  };

  var retrieveWorkouts = function() {
    var promise = $http.get('/workout/history/' + selectedClient.id).then(function (response) {
      workouts = response.data;
    });
    return promise;
  };

  var facRetrieveScreens = function() {
    var promise = $http.get('/fms/history/' + selectedClient.id).then(function (response) {
      facFMScreens = response.data;
    });
    return promise;
  };

  var retrieveWorkout = function() {
    var promise = $http.get('/workout/detail/' + selectedWorkout).then(function (response) {
      workout = response.data[0];
    });
    return promise;
  };

  var facRetrieveFMS = function() {
    var promise = $http.get('/fms/detail/' + facSelectedFMS).then(function (response) {
      facFMScreen = response.data[0];
    });
    return promise;
  };

  var retrieveExercises = function() {
    var promise = $http.get('/workout/exercises/' + selectedWorkout).then(function (response) {
      exercises = response.data;
    });
    return promise;
  };

  // ----------------------------------- personal -------------------------------------------
  var postPersonal = function(data) {
    //console.log('factory data', data);
    $http.post('/personal/', data).then(function(response) {
      console.log(response.data.rows[0]);
      personalInfoId = response.data.rows[0];
    });
  };


// ----------------------------------------------------------------------------------------------------
  var updatePersonal = function(editedInfo) {
    console.log('factory data', editedInfo);
    $http.put('/personalhistory/', editedInfo).then(function(response) {
      //console.log(response.data.rows[0]);
      personalInfoId = response.data.rows[0];
    });
  };

  //var getPersonal = function() {
  //  console.log('getPersonal in factory fired');
  //  var promise = $http.get('/personal/'+ personalInfoId).then(function(response) {
  //    clientPersonal = response.data;
  //    console.log('clientPersonal', clientPersonal);
  //  });
  //  return promise;
  //};

  var getPersonal = function() {
    //console.log('getPersonal in factory fired');
    var promise = $http.get('/personalhistory/' + selectedClient.id).then(function(response) {
      clientPersonal = response.data;
      console.log('clientPersonal', clientPersonal);
    });
    return promise;
  };
  // ----------------------------------- end of personal -------------------------------------------


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
    var promise = $http.get('/medical/' + selectedClient.id).then(function(response) {
      clientMedical = response.data;
      console.log('Client Medical:', clientMedical);
    });
    return promise;
  };

  var facPostFmsData = function(data) {
    console.log('posting fms data');
    $http.post('/fms', data).then(function(response) {
      console.log('match data saved');
      console.log(response);
    });
  };

  var facGetFmsData = function() {
    console.log('getting data from server for id: ', facUserIdNumber);
    var promise = $http.get('/fms/' + facUserIdNumber).then(function(response) {
      facFmsData = response.data;
      console.log('Async data response:', facFmsData);
    });
  };

  // ------------------------------------ admin locations ---------------------------------------
  // post info from the location view
  var postLocation = function(location) {
    //console.log('factory location', location);
    var promise = $http.post('/admin/', location).then(function(response) {
    });
    return promise;
  };

  var retrieveLocation = function() {
    var promise = $http.get('/admin/').then(function(response) { // go to the GET in admin module and wait for a response. then use that data in this next function.
      location = response.data; // save those results to the location variable and go back to the controller
      //console.log("inside the retrieveLocation", location);
    });
    return promise; // needed to wrap up this function
  };

  var deleteFromLocationList = function(data) {
    console.log(data);
    var promise = $http.delete('/admin/locationList' + data).then(function(response) {
    });
    return promise;
  };

  //var fillLocationList = function () {
  //  var promise = $http.get('/admin/locationList/').then(function(response) {
  //    locationList = response.data;
  //    console.log(classList);
  //  });
  //  return promise;
  //};
  // ------------------------------------- end of admin locations ------------------------------------------

  var fillClassList = function () {
    var promise = $http.get('/workout/classlist/').then(function(response) {
      classList = response.data;
      //console.log(classList);
    });
    return promise;
  };

  var deleteFromClassList = function(data) {
    var promise = $http.delete('/admin/classList' + data).then(function(response) {
    });
    return promise;
  };

  var postNewClass = function(data) {
    console.log(data);
    var promise = $http.post('/admin/classlist', data).then(function (response) {
    });
    return promise;
  };

  var retrieveClients = function() {
    var promise = $http.get('/admin/clients').then(function(response) {
      clients = response.data;
      console.log('These are the clients: ', clients);
    });
    return promise;
  };

  var setAsActive = function(id) {
    var data = {
      active_status: true
    };

    $http.put('/admin/status/' + id, data).then(function(response) {
    });
  };

  var setAsInactive = function(id) {
    var data = {
      active_status: false
    };

    $http.put('/admin/status/' + id, data).then(function(response) {
    });
  };

  var retrieveAllExercises = function() {
    var promise = $http.get('/admin/exercise').then(function(response) {
      allExercises = response.data;
    });
    return promise;
  };

  var exerciseActive = function(id) {
    var data = {
      active_status: true
    };

    $http.put('/admin/exercise/' + id, data).then(function(response) {
    });
  };

  var exerciseInactive = function(id) {
    var data = {
      active_status: false
    };

    $http.put('/admin/exercise/' + id, data).then(function(response) {
    });
  };

  var exerciseAdd = function(data) {
    $http.post('/admin/newexercise', data).then(function(response) {
    });
  };

  var getAllFlags = function() {
    var promise = $http.get('/admin/flags').then(function(response) {
      flags = response.data;
    });
    return promise;
  };

  var updateFlag = function(id) {
    var data = {
      flag: false
    };

    $http.put('/admin/flags/' + id, data).then(function(response) {
    });
  };

  //PUBLIC

  var dataFactoryOutput = {
    newTrainer: function(data){
      return facNewTrainer(data);
    },
    updateTrainer: function(data){
      return facUpdateTrainer(data);
    },
    getTrainers: function() {
      return facGetTrainers();
    },
    trainerList: function() {
      return facTrainerList;
    },
    factorySaveNewWorkout: function(workout, client) {
      return saveNewWorkout(workout, client);
    },
    factorySearchClient: function(query) {
      return searchClient(query);
    },
    factoryNameQuery: function() {
      return nameQuery;
    },
    factoryGetClient: function(client){
      selectedClient = client;
      selectedClient.present = true;
      return selectedClient;
    },
    factoryResetClient: function(){
      selectedClient = {};
      selectedClient.present = false;
      return selectedClient;
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
        console.log(history);
      return postMedical(history);
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
      //console.log('in the factory', info);
      return postPersonal(info);
    },
    insertPersonal: function(editedInfo) {
      //console.log('in the factory', info);
      return updatePersonal(editedInfo);
    },
    //retrievePersonal: function() {
    //  return getPersonal();
    //},
    //  console.log('in the factory', info);
    //  return postPersonal(info);
    //},
    sendLocation: function(location) {
      //console.log('in the factory', location);
      return postLocation(location);
    },
    // call the retrieveLocation function from private. return the data.
    getLocation: function() {
      return retrieveLocation();
    },
    // store the location in this function to be called by the controller
    getLocationVariable: function() {
      return location;
    },
    adminRemoveLocation: function(id) {
      return deleteFromLocationList(id);
    },
    //factoryGetLocationList: function() {
    //  return fillLocationList();
    //},
    //factoryLocations: function() {
    //  return locationList;
    //},
    retrievePersonal: function() {
      //console.log('retrievePersonal function working data factory');
      return getPersonal();

    },

    clientInfo: function() {
      return clientPersonal;
    },
    factoryGetWorkout: function(id) {
      selectedWorkout = id;
      return selectedWorkout;
    },
    selectedFMS: function(id) {
      facSelectedFMS = id;
      return facSelectedFMS;
    },
    factoryCheckWorkout: function() {
      return selectedWorkout;
    },
    checkFMS: function() {
      return facSelectedFMS;
    },
    factoryGetClassList: function() {
      return fillClassList();
    },
    factoryClasses: function() {
      return classList;
    },
    factoryStartClass: function(id) {
      currentClass = id;
      //console.log('This is the currentClass', id);
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
    fmScreens: function() {
      return facFMScreens;
    },
    retrieveScreens: function() {
      return facRetrieveScreens();
    },
    factoryRetrieveExercises: function() {
      return retrieveExercises();
    },
    factoryExercises: function() {
      return exercises;
    },
    factoryRetrieveWorkout: function() {
      return retrieveWorkout();
    },
    retrieveFMS: function() {
      return facRetrieveFMS();
    },
    factoryWorkout: function() {
      return workout;
    },
    fmScreen: function() {
      return facFMScreen;
    },
    factoryReturnSelectedClient: function() {
      return selectedClient;
    },
    adminRemoveClass: function(id) {
      return deleteFromClassList(id);
    },
    sendNewClass: function(newClass) {
      //console.log(newClass);
      return postNewClass(newClass);
    },
    factoryRetrieveClients: function() {
      return retrieveClients();
    },
    factoryClients: function() {
      return clients;
    },
    factoryMakeActive: function(id) {
      return setAsActive(id);
    },
    factoryMakeInactive: function(id) {
      return setAsInactive(id);
    },
    factoryRetrieveAllExercises: function(){
      return retrieveAllExercises();
    },
    factoryAllExercises: function(){
      return allExercises;
    },
    factoryMakeExerciseActive: function(id) {
      return exerciseActive(id);
    },
    factoryMakeExerciseInactive: function(id) {
      return exerciseInactive(id);
    },
    factoryAddExercise: function(exercise) {
      return exerciseAdd(exercise);
    },
    retrieveFlags: function() {
      return getAllFlags();
    },
    getFlags: function() {
      return flags;
    },
    updateFlags: function(id) {
      return updateFlag(id);
    }
  };
  return dataFactoryOutput;

}]);