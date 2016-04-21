myApp.controller('SidebarController',['AuthFactory' ,'$scope' , function (AuthFactory, $scope) {
  var _this = this;
  var authFactory = AuthFactory;
  _this.loggedIn = authFactory.checkLoggedIn(); // NOTE: only updated on page load
  $scope.hidebar = authFactory.Status.sidebar;

  $scope.$watch('hidebar', function(newValue, oldValue){
    $scope.hidebar = newValue;
    console.log('hidebar'+$scope.hidebar);
    console.log('authFactory.Status.sidebar: '+authFactory.Status.sidebar);
    console.log(_this.loggedIn);
  });
  console.log(_this.loggedIn);


}]);
