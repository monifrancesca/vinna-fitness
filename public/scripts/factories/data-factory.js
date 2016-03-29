myApp.factory('DataFactory', ['$http', function($http) {

  var facUserIdNumber = '1';
  var facFmsData = null;

  var facPostFmsData = function(data) {
    console.log('posting fms data');
    var promise = $http.post('/fms', data).then(function(response) {
      console.log('match data saved');
      console.log(response);
    });
    return promise;
  };

  var facGetFmsData = function() {
    console.log('getting data from server for id: ', facUserIdNumber);
    var promise = $http.get('/fms/' + facUserIdNumber).then(function(response) {
      facFmsData = response.data;
      console.log('Async data response:', facFmsData);
    });
    return promise;
  };





  var dataFactoryOutput = {
    postFmsData: function(data){
      return facPostFmsData(data);
    },
    getFmsData: function(){
      return facGetFmsData();
    }
  };

  return dataFactoryOutput;

}]);