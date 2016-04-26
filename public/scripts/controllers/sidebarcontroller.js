myApp.controller('SidebarController', ['$scope', 'AuthFactory', function($scope, AuthFactory) {

  var authFactory = AuthFactory;
  $scope.showbar = '';


  $scope.$watch(
    function() { return authFactory.Status.sidebar; },
    function(newVal, oldVal) {
      if (authFactory.Status.sidebar === true) {
        $scope.showbar = true;
        console.log('authFactory.Status.sidebar: '+authFactory.Status.sidebar);
        console.log('$scope.showbar: '+$scope.showbar);
      } else {$scope.showbar = false;}
    },
    true
  );

}]);