myApp.factory('DataFactory', ['$http', function($http) {

    var fakeIdentifier = 'a';
    var clientMedical;

    var postMedical = function(data) {
        console.log('factory data', data);
        $http.post('/medical/' + fakeIdentifier, data).then(function(response) {
        });
    };

    var getMedical = function() {
        console.log('getMedical in factory fired');
        $http.get('/medical/' + fakeIdentifier).then(function(response) {
            clientMedical = response.data;
            console.log('clientMedical', clientMedical);
        });
    };


    var dataFactoryOutput = {
        sendMedical: function(history) {
            console.log('in the factory', history)
            postMedical(history);
        },
        retrieveMedical: function() {
            getMedical();
        },
        clientInfo: function() {
            return clientMedical;
        }

      };

      return dataFactoryOutput;

}]);