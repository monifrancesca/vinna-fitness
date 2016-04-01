myApp.controller('AdminController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  //$scope.dataFactory.getLocation().then(function() {
  //  $scope.location = $scope.dataFactory.getLocation();
  //  console.log($scope.location);
  //
  //  //$scope.info = $scope.clientPersonal[0];
  //  //console.log($scope.info);
  //});

  $scope.saveLocation = function() {
    var location = {
      locationName: $scope.locationName
    };
    console.log('info in controller', location);
    $scope.dataFactory.sendLocation(location);
  };

}]);