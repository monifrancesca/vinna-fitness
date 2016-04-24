myApp.controller('FmsDetailsController', ['$scope', '$location', '$http', 'DataFactory', '$window', 'AuthFactory', function($scope, $location, $http, DataFactory, $window, AuthFactory) {

  var authFactory = AuthFactory;
  $scope.dataFactory = DataFactory;

  $scope.screen = {};
  $scope.toeTouch = null;
  $scope.lImpingement = null;
  $scope.rImpingement = null;
  $scope.pronePress = null;
  $scope.flex = null;
  //$scope.exercises = [];
  $scope.client = $scope.dataFactory.factoryReturnSelectedClient();

  authFactory.isLoggedIn().then(function (response) {
    if (!response.data.status) {
      $window.location.href = '/';
    } else {
    }
  });

  //Resets "existing client" in database to prevent errors
  $scope.dataFactory.factoryResetClient();

  if ($scope.dataFactory.checkFMS() == undefined) {
    $location.path('existingFms');
  } else {
    $scope.dataFactory.retrieveFMS().then(function() {
      $scope.screen = $scope.dataFactory.fmScreen();
      if($scope.screen.toe_touch == true){
        $scope.toeTouch = 'Able';
      } else {$scope.toeTouch = 'Not Able';}
      if($scope.screen.l_impingement == true){
        $scope.lImpingement = 'Positive';
      } else {$scope.lImpingement = 'Negative';}
      if($scope.screen.r_impingement == true){
        $scope.rImpingement = 'Positive';
      } else {$scope.rImpingement = 'Negative';}
      if($scope.screen.prone_press == true){
        $scope.pronePress = 'Positive';
      } else {$scope.pronePress = 'Negative';}
      if($scope.screen.flexion == true){
        $scope.flex = 'Positive';
      } else {$scope.flex = 'Negative';}
      console.log('This is the fmScreen', $scope.screen);
    });

    //$scope.dataFactory.factoryRetrieveExercises().then(function() {
    //  $scope.exercises = $scope.dataFactory.factoryExercises();
    //  console.log('These are the exercises', $scope.exercises);
    //});
  }


}]);