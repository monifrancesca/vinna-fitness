myApp.controller('WorkoutHistoryController', ['$scope', '$location', '$http', 'DataFactory', 'AuthFactory', '$window', function($scope, $location, $http, DataFactory, AuthFactory, $window) {

  var authFactory = AuthFactory;
  authFactory.isLoggedIn().then(function (response) {
    if (!response.data.status) {
      $window.location.href = '/';
    } else {
  $scope.dataFactory = DataFactory;
  $scope.workouts = [];
  $scope.client = $scope.dataFactory.factoryReturnSelectedClient();
  console.log('scopeClient: '+$scope.dataFactory.factoryReturnSelectedClient().present);

  if ($scope.client.present == false) {
    $location.path('existingclient');
  } else {
    $scope.dataFactory.factoryRetrieveWorkouts().then(function() {
      $scope.workouts = $scope.dataFactory.factoryWorkouts();
      console.log('These are the workouts', $scope.workouts);
    });
  }

  $scope.getWorkout = function(id) {
    $scope.dataFactory.factoryGetWorkout(id);
    $location.path('workoutdetails');
  }
    }});
}]);