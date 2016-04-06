myApp.controller('PersonalController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  //$scope.dataFactory.retrievePersonal().then(function() {
  //  $scope.clientPersonal = $scope.dataFactory.clientInfo();
  //  console.log($scope.clientPersonal);
  //
  //  $scope.info = $scope.clientPersonal[0];
  //  console.log($scope.info);
  //});


  $scope.savePersonalInfo = function() {
    var feet = $scope.heightFeet.toString();
    var inches = $scope.heightInches.toString();
    var height = feet + '\'' + inches + '\"';
    console.log(height);
    var info = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      phoneNumber: $scope.phoneNumber,
      emailAddress: $scope.emailAddress,
      dateOfBirth: $scope.dateOfBirth,
      height: height,
      weightPounds: $scope.weightPounds,
      emergencyContactName: $scope.emergencyContactName,
      emergencyContactNumber: $scope.emergencyContactNumber
    };
    console.log('info in controller', info);
    $scope.dataFactory.sendPersonal(info);
  };

}]);