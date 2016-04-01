myApp.controller('AdminClassController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;

    $scope.dataFactory.retrieveClassList();

}]);