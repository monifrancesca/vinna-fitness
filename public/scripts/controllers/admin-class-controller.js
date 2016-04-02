myApp.controller('AdminClassController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;

    $scope.dataFactory.factoryGetClassList().then(function() {
        $scope.classes = $scope.dataFactory.factoryClasses();
    });

    $scope.removeClass = function(id) {
        $scope.dataFactory.adminRemoveClass(id).then(function() {
            $scope.dataFactory.factoryGetClassList().then(function() {
                $scope.classes = $scope.dataFactory.factoryClasses();
            });
        });
    };

}]);