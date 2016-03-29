myApp.controller('PersonalController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  //$scope.dataFactory.retrievePersonal().then(function() {
  //  $scope.clientPersonal = $scope.dataFactory.clientInfo();
    //console.log($scope.clientPersonal);

  //  $scope.info = $scope.clientPersonal[0];
  //  //console.log($scope.info);
  //});

  $scope.savePersonalInfo = function() {
    var info = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      phoneNumber: $scope.phoneNumber,
      emailAddress: $scope.emailAddress,
      dateOfBirth: $scope.dateOfBirth,
      heightFeet: $scope.heightFeet,
      heightInches: $scope.heightInches,
      weightPounds: $scope.weightPounds,
      emergencyContactName: $scope.emergencyContactName,
      emergencyContactNumber: $scope.emergencyContactNumber
    };
    console.log('info in controller', info);
    $scope.dataFactory.sendPersonal(info);
  };

}]);