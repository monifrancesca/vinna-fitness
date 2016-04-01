myApp.controller('AdminClassController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;

    $scope.dataFactory.factoryGetClassList().then(function() {
        $scope.classes = $scope.dataFactory.factoryClasses();
        console.log('These are the classes', $scope.classes);
    });

    $scope.removeClass = function() {
        $scope.dataFactory.adminRemoveClass();
    };

}]);