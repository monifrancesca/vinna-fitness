myApp.factory('DataFactory', ['$http', function($http) {

    var fakeIdentifier = 'a';
    var clientMedical = undefined;

    var postMedical = function(data) {
        console.log('factory data', data);
        $http.post('/medical/' + fakeIdentifier, data).then(function(response) {
        });
    };

    var getMedical = function() {
        console.log('getMedical in factory fired');
        var promise = $http.get('/medical/' + fakeIdentifier).then(function(response) {
            clientMedical = response.data;
            console.log('clientMedical', clientMedical);
        });
        return promise;
    };


    var dataFactoryOutput = {
        sendMedical: function(history) {
            console.log('in the factory', history)
            postMedical(history);
        },
        retrieveMedical: function() {
            return getMedical();
        },
        clientInfo: function() {
            return clientMedical;
        }

      };

      return dataFactoryOutput;

}]);