myApp.factory('AuthFactory', function ($http) {
  var Status = {
    loggedIn: false,
    usersId: undefined



  };

  // the public API
  return {
    Status: Status,

    checkLoggedIn: function () {
      return Status.loggedIn;
    },

    isLoggedIn: function () {
      return $http.get('/auth');
    },

    setLoggedIn: function (value) {
      Status.loggedIn = value;
    },

    logout: function () {
      return $http.get('/auth/logout');
    },
    trainerId: function () {
      return Status.usersId
    },
    setTrainerId: function (id) {
      Status.usersId = id;
    }
  };

});
