myApp.controller('WorkoutHistoryController', ['$scope', '$location', '$http', 'DataFactory', function($scope, $location, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.workouts = [];

  $scope.client = $scope.dataFactory.factoryReturnSelectedClient();

  if ($scope.client == 'undefined') {
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

}]);