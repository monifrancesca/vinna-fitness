myApp.controller('NavController', ['$scope', 'AuthFactory', '$location', '$window', 'DataFactory', function
  ($scope, AuthFactory, $location, $window, DataFactory) {

  var _this = this;
  var authFactory = AuthFactory;
  $scope.dataFactory = DataFactory;
  $scope.client = {};
  $scope.logoutHide = authFactory.Status.sidebar;

  _this.displayLogout = false; // should we display the logout option on the DOM?
  _this.message = {
    text: false,
    type: 'info'
  };

  authFactory.isLoggedIn()
  .then(function (response) {
    if (response.data.status) {
      _this.displayLogout = true;
      authFactory.setLoggedIn(true);
      _this.username = response.data.name;
      authFactory.setTrainerId(response.data.id);
      console.log('hopes and dreams: '+authFactory.trainerId());
    } else { // is not logged in on server
      _this.displayLogout = false;
      authFactory.setLoggedIn(false);
      authFactory.setTrainerId('');
    }
  },

  function () {
    _this.message.text = 'Unable to properly authenticate user';
    _this.message.type = 'error';
  });

  _this.logout = function () {
    authFactory.logout()
      .then(function (response) { // success
        authFactory.setLoggedIn(false);
          authFactory.setTrainerId('');
        _this.username = '';
        $window.location.href = '/'; // forces a page reload which will update our NavController
      },

      function (response) { // error
        _this.message.text = 'Unable to logout';
        _this.message.type = 'error';
      });
  };

  this.back = function() {
    $window.history.back();
  };

  $scope.$watch(
    function() { return authFactory.Status.sidebar; },
    function(newVal, oldVal) {
      if (authFactory.Status.sidebar === true) {
        $scope.logoutHide = true;
      } else {$scope.logoutHide = false;}
    },
    true
  );

}]);
