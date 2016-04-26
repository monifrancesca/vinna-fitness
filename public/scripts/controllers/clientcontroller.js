
myApp.controller('ClientController', ['$scope', '$http', '$location', 'DataFactory', 'AuthFactory', '$window', function($scope, $http, $location, DataFactory, AuthFactory, $window) {

  var authFactory = AuthFactory;
  authFactory.isLoggedIn().then(function (response) {
    if (!response.data.status) {
      $window.location.href = '/';
    } else {

  $scope.dataFactory = DataFactory;
  $scope.names = [];
  $scope.searchName = {};
  $scope.client = {};
  $scope.clientSelected = false;

  //Checks if user is logged in
  authFactory.isLoggedIn().then(function (response) {
    if (!response.data.status) {
      $window.location.href = '/';
    }});

  //This function grabs the current client from the factory. This is necessary so that if you selected a client,
  // view their history, and then click back, the client is still saved.
  $scope.client = $scope.dataFactory.factoryReturnSelectedClient();

  //This function checks to see if there is an existing client already in the data factory. If there is, the
  // page will be populated with that person's data.
  if ($scope.client.present != false){
    $scope.searchName.query = $scope.client.name;
    $scope.names = [];
    $scope.clientSelected = true;
  }

  //This function controls the client name search
  $scope.nameQuery = function() {
    var query = $scope.searchName.query;
    if (query.length >= 1) {
      $scope.dataFactory.factorySearchClient(query).then(function() {
        $scope.names = $scope.dataFactory.factoryNameQuery();
      });
    }
    else {
      $scope.names = [];
    }
  };

  //This function controls what happens when you select a specific client from the search results
  $scope.selectClient = function(id, first, last){
    $scope.client.name = first + ' ' + last;
    $scope.searchName.query = $scope.client.name;
    $scope.client.id = id;
    $scope.names = [];
    $scope.clientSelected = true;
  };

  //Allows user to switch client if they want to view information for a different existing client
  $scope.switchClient = function() {
    $scope.client = {};
    $scope.client.present = false;
    $scope.clientSelected = false;
    $scope.searchName.query = "";
  };

  //These functions control what happens when you click on the main buttons in the admin dashboard
  $scope.loadPersonal = function() {
    $scope.dataFactory.factoryGetClient($scope.client);
    $location.path('personalhistory');
  };

  $scope.loadMedical = function() {
    $scope.dataFactory.factoryGetClient($scope.client);
    $location.path('medical');
  };

  $scope.loadNewFMS = function() {
    $scope.dataFactory.factoryGetClient($scope.client);
    $location.path('fms');
  };

  $scope.loadFMSHistory = function() {
    $scope.dataFactory.factoryGetClient($scope.client);
    $location.path('existingFms');
  };

  $scope.loadWorkoutHistory = function() {
    $scope.dataFactory.factoryGetClient($scope.client);
    $location.path('workouthistory');
  };

  $scope.loadNewWorkout = function() {
    $scope.dataFactory.factoryGetClient($scope.client);
    $location.path('workout');
  };

    }});

}]);