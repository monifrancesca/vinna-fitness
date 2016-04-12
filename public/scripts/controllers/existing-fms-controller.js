myApp.controller('ExistingFMSController', ['$scope', '$location', '$http', 'DataFactory', function($scope, $location, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.client = $scope.dataFactory.factoryReturnSelectedClient();
  $scope.screens = [];

  if ($scope.client == 'undefined') {
    $location.path('existingclient');
  } else {
    $scope.dataFactory.retrieveScreens().then(function() {
      $scope.screens = $scope.dataFactory.fmScreens();
      console.log('These are the screens', $scope.screens);
    });
  }

  $scope.funcScreen = function(id) {
    $scope.dataFactory.selectedFMS(id);
    $location.path('fmsDetails');
  }

}]);