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

  $scope.selectClient = function(id, first, last){
    $scope.client.name = first + ' ' + last;
    $scope.searchName.query = $scope.client.name;
    $scope.client.id = id;
    $scope.names = [];
    $scope.clientSelected = true;

  };

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