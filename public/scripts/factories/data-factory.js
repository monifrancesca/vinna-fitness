myApp.factory('DataFactory', ['$http', function($http) {

    var postMedical = function(data) {
        console.log('factory data', data);
        $http.post('/medical/', data).then(function(response){
        });
    };


    var dataFactoryOutput = {
        sendMedical: function(history) {
            console.log('in the factory', history)
            postMedical(history);
        }

      };

      return dataFactoryOutput;

}]);