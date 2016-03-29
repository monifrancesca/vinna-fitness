myApp.factory('DataFactory', ['$http', function($http) {

  //PRIVATE

  //var fakeIdentifier = 'a';
  var clientPersonal = undefined;

  var postPersonal = function(data) {
    console.log('factory data', data);
    $http.post('/personal/', data).then(function(response) {
    });
  };

  //var getPersonal = function() {
  //  console.log('getPersonal in factory fired');
  //  var promise = $http.get('/personal/' + fakeIdentifier).then(function(response) {
  //    clientPersonal = response.data;
  //    console.log('clientPersonal', clientPersonal);
  //  });
  //  return promise;
  //};


  //PUBLIC

  var dataFactoryOutput = {
    sendPersonal: function(info) {
      console.log('in the factory', info);
      postPersonal(info);
    },
    //retrievePersonal: function() {
    //  return getPersonal();
    //},
    clientInfo: function() {
      return clientPersonal;
    }

  };

  return dataFactoryOutput;

}]);