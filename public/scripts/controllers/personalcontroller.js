myApp.controller('PersonalController', ['$scope', '$location', '$http', 'DataFactory', function($scope, $location, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.height = {};
  $scope.info = {};

  //$scope.dataFactory.retrievePersonal().then(function() {
  //  $scope.clientPersonal = $scope.dataFactory.clientInfo();
  //  console.log($scope.clientPersonal);
  //
  //  $scope.info = $scope.clientPersonal[0];
  //  console.log($scope.info);
  //});

  $scope.savePersonalInfo = function() {
    //console.log('feet', $scope.height.feet);
    //console.log('inches', $scope.height.inches);
    var feet = $scope.height.feet.toString();
    var inches = $scope.height.inches.toString();
    var height = feet + '\'' + inches + '\"';
    console.log(height);
    var info = {
      firstName: $scope.info.firstName,
      lastName: $scope.info.lastName,
      phoneNumber: $scope.info.phoneNumber,
      emailAddress: $scope.info.emailAddress,
      dateOfBirth: $scope.info.dateOfBirth,
      height: height,
      weightPounds: $scope.info.weightPounds,
      emergencyContactName: $scope.info.emergencyContactName,
      emergencyContactNumber: $scope.info.emergencyContactNumber
    };
    console.log('info in controller', info);
    $scope.dataFactory.sendPersonal(info);
    $location.path('newmedical')
  };

}]);