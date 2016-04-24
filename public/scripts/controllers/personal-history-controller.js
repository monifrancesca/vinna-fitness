myApp.controller('PersonalHistoryController', ['$scope', '$location', '$http', 'DataFactory', 'AuthFactory', '$window', function($scope, $location, $http, DataFactory, AuthFactory, $window) {


  var authFactory = AuthFactory;
  authFactory.isLoggedIn().then(function (response) {
    if (!response.data.status) {
      $window.location.href = '/';
    } else {
  $scope.dataFactory = DataFactory;
  $scope.displayHistory = false;
  $scope.editHistory = true;

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
      firstName: $scope.info.first_name,
      lastName: $scope.info.last_name,
      phoneNumber: $scope.info.phone,
      emailAddress: $scope.info.email,
      dateOfBirth: $scope.info.dob,
      height: $scope.info.height,
      weightPounds: $scope.info.weight,
      emergencyContactName: $scope.info.emergency_name,
      emergencyContactNumber: $scope.info.emergency_phone,
      active_status: true
    };
    //console.log('info in controller', info);
    $scope.dataFactory.sendPersonal(info);
  };

  $scope.viewPersonalEdit = function() {
    $scope.displayHistory = true;
    $scope.editHistory = false;
  };

  //$scope.viewPersonalEdit = function() {
  //  $scope.displayHistory = true;
  //  $scope.editHistory = false;
  //};

  $scope.updatePersonalInfo = function() {
    //var feet = $scope.heightFeet.toString();
    //var inches = $scope.heightInches.toString();
    //var height = feet + '\'' + inches + '\"';
    //console.log(height);
    var editedInfo = {
      id: $scope.info.id,
      firstName: $scope.info.first_name,
      lastName: $scope.info.last_name,
      phoneNumber: $scope.info.phone,
      emailAddress: $scope.info.email,
      dateOfBirth: $scope.info.dob,
      height: $scope.info.height,
      weightPounds: $scope.info.weight,
      emergencyContactName: $scope.info.emergency_name,
      emergencyContactNumber: $scope.info.emergency_phone
    };
    console.log('info in controller', editedInfo);
    $scope.dataFactory.insertPersonal(editedInfo);
    $location.path('existingclient');
  };
    }});
}]);