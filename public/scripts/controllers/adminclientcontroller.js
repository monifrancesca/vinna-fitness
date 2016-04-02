myApp.controller('AdminClientController', ['$scope', '$location', '$http', 'DataFactory', function($scope, $location, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.clients = [];

  $scope.dataFactory.factoryRetrieveClients().then(function() {
    $scope.clients = $scope.dataFactory.factoryClients();
    console.log('These are the clients', $scope.clients);
  });

  $scope.makeActive = function(id) {
    $scope.dataFactory.factoryMakeActive(id);
    $scope.dataFactory.factoryRetrieveClients().then(function() {
      $scope.clients = $scope.dataFactory.factoryClients();
      console.log('These are the clients', $scope.clients);
    });
  };

  $scope.makeInactive = function(id) {
    $scope.dataFactory.factoryMakeInactive(id);
    $scope.dataFactory.factoryRetrieveClients().then(function() {
      $scope.clients = $scope.dataFactory.factoryClients();
      console.log('These are the clients', $scope.clients);
    });
  };

}]);