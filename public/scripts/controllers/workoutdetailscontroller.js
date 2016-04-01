myApp.controller('WorkoutDetailsController', ['$scope', '$location', '$http', 'DataFactory', function($scope, $location, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.workout = {};

  $scope.client = $scope.dataFactory.factoryReturnSelectedClient();

  $scope.dataFactory.factoryRetrieveWorkout().then(function() {
    $scope.workout = $scope.dataFactory.factoryWorkout();
    console.log('This is the workout', $scope.workout);
  });

  //$scope.getWorkout = function(id) {
  //  $scope.dataFactory.factoryGetWorkout(id);
  //  $location.path('workoutdetails');
  //}

}]);