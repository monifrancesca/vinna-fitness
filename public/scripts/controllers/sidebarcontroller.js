
myApp.controller('SidebarController', ['$scope', 'AuthFactory', function($scope, AuthFactory) {

  var authFactory = AuthFactory;
  $scope.showbar = '';


  $scope.$watch(
    function() { return authFactory.Status.sidebar; },
    function(newVal, oldVal) {
      if (authFactory.Status.sidebar === true) {
        $scope.showbar = true;
      } else {$scope.showbar = false;}
    },
    true
  );

}]);