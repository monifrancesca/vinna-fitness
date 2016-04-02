myApp.controller('AdminController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  // GET runs when html file loads via ng-repeat
  $scope.dataFactory.getLocation().then(function() { //go to the data factory and run this function. come back to write the .then when you have the results stored in the data factory.
    $scope.locations = $scope.dataFactory.getLocationVariable(); // get the data from this function in the data factory and assign it to locations (ng-repeat variable) to use in the html ng-repeat
  });

  // send location to the data factory
  $scope.saveLocation = function() {
    var location = { // set ng-model variable to variable location
      locationName: $scope.locationName
    };
    //console.log('info in controller', location);
    $scope.dataFactory.sendLocation(location); // send location variable to this function in the data factory
  };

}]);