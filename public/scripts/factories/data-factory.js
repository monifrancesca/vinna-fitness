myApp.factory('DataFactory', ['$http', function($http) {

  var facPostFmsData = function(data) {
    console.log('posting fms data');
    var promise = $http.post('/fms', data).then(function(response) {
      console.log('match data saved');
      console.log(response);
    });
    return promise;
  };







  var dataFactoryOutput = {
    postFmsData: function(data){
      return facPostFmsData(data);
    }
  };

  return dataFactoryOutput;

}]);