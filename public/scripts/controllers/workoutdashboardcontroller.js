myApp.controller('WorkoutDashboardController', ['$scope', '$location', '$http', 'DataFactory', 'AuthFactory', '$window', function($scope, $location, $http, DataFactory, AuthFactory, $window) {

  var authFactory = AuthFactory;
  authFactory.isLoggedIn().then(function (response) {
    if (!response.data.status) {
      $window.location.href = '/';
    } else {
  $scope.dataFactory = DataFactory;
  $scope.classes = [];

  $scope.dataFactory.factoryGetClassList().then(function() {
    $scope.classes = $scope.dataFactory.factoryClasses();
    console.log('These are the classes', $scope.classes);
  });

  $scope.startClass = function() {
    console.log('This is the class we are selecting', $scope.classType.id);
    var class_id = $scope.classType.id;
    $scope.dataFactory.factoryStartClass(class_id);
    $location.path('workout');
  }

  $scope.startPersonal = function() {
    $scope.dataFactory.factoryStartClass(10);
    $location.path('workout');
  }
    }});
}]);