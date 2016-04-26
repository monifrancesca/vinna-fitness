myApp.controller('AdminController', ['$scope', '$http', 'DataFactory', 'AuthFactory', '$window', '$location', function($scope, $http, DataFactory, AuthFactory, $window, $location) {

  var authFactory = AuthFactory;
  authFactory.isLoggedIn().then(function (response) {
    if (!response.data.status) {
      $window.location.href = '/';
    } else {
      $scope.dataFactory = DataFactory;

      $scope.flags = [];

      $scope.allTrainers = [];
      $scope.selected = null;
      $scope.trainerInfo = {
        adminStatus: null,
        tFirstName: null,
        tLastName: null,
        googleEmail: null
      };

      $scope.showHideStatus = true;

      $scope.trainer = {};

      //$scope.dataFactory.getLocation().then(function() {
      //  $scope.location = $scope.dataFactory.getLocation();
      //  console.log($scope.location);
      //
      //  //$scope.info = $scope.clientPersonal[0];
      //  //console.log($scope.info);
      //});

      // GET runs when html file loads via ng-repeat
      $scope.dataFactory.getLocation().then(function() { //go to the data factory and run this function. come back to write the .then when you have the results stored in the data factory.
        $scope.locations = $scope.dataFactory.getLocationVariable(); // get the data from this function in the data factory and assign it to locations (ng-repeat variable) to use in the html ng-repeat
      });

      // remove location
      $scope.removeLocation = function(id) {
        $scope.dataFactory.adminRemoveLocation(id).then(function() {
          $scope.dataFactory.getLocation().then(function() {
            $scope.locations = $scope.dataFactory.getLocationVariable(); // put up on the DOM
          });
        });
      };

      // send location to the data factory
      $scope.saveLocation = function() {
        var location = { // set ng-model variable to variable location
          locationName: $scope.locationName
        };
        //console.log('info in controller', location);
        $scope.dataFactory.sendLocation(location).then(function() {
          $scope.dataFactory.getLocation().then(function() { //go to the data factory and run this function. come back to write the .then when you have the results stored in the data factory.
            $scope.locations = $scope.dataFactory.getLocationVariable(); // get the data from this function in the data factory and assign it to locations (ng-repeat variable) to use in the html ng-repeat
          });
        }); // send location variable to this function in the data factory
        $scope.locationName = '';
      };

      // Admin trainers logic
      $scope.dataFactory.getTrainers().then(function(){
        $scope.allTrainers = $scope.dataFactory.trainerList();
      });

      $scope.showEdit = function(index){
        $scope.selected = index;
      };

      $scope.addTrainer = function(info){
        $scope.dataFactory.newTrainer(info).then(function(){
          $scope.allTrainers = $scope.dataFactory.trainerList();
        })
      };

      $scope.openEditTrainers = function(trainer){
        $location.path('edittrainers');
        $scope.trainer = trainer;
        console.log($scope.trainer);
        //$scope.first_name = $scope.trainer.first_name;
        //console.log($scope.first_name);
      };

      //this needs to be associated with a call
      //$scope.dataFactory.updateTrainer(trainer).then(function(){
      //  $scope.allTrainers = $scope.dataFactory.trainerList();
      //});

      $scope.showHide = function(){
        $scope.showHideStatus = true;
      };

      $scope.dataFactory.retrieveFlags().then(function() {
        $scope.flags = $scope.dataFactory.getFlags();
      });

      $scope.removeFlag = function(id) {
        $scope.dataFactory.updateFlags(id);
        $scope.dataFactory.retrieveFlags().then(function () {
          $scope.flags = $scope.dataFactory.getFlags();
        });
      };
    }
  });
}]);