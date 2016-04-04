myApp.controller('PersonalHistoryController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.dataFactory.retrievePersonal().then(function() {
    $scope.clientPersonal = $scope.dataFactory.clientInfo();
    console.log($scope.clientPersonal);

    $scope.info = $scope.clientPersonal[0];
    console.log($scope.info);

    $scope.firstName = $scope.info.first_name;
    $scope.lastName = $scope.info.last_name;
    $scope.phoneNumber = $scope.info.phone;
    $scope.emailAddress = $scope.info.email;
    $scope.dateOfBirth = $scope.info.dob;
    $scope.height = $scope.info.height;
    $scope.weightPounds = $scope.info.weight;
    $scope.emergencyContactName = $scope.info.emergency_name;
    $scope.emergencyContactNumber = $scope.info.emergency_phone;
  });


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