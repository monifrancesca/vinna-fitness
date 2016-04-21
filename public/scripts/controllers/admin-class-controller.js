myApp.controller('AdminClassController', ['$scope', '$http', 'DataFactory', 'AuthFactory', '$window', function($scope, $http, DataFactory, AuthFactory, $window) {

    var authFactory = AuthFactory;
    authFactory.isLoggedIn().then(function (response) {
        if (!response.data.status) {
            $window.location.href = '/';
        } else {
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

    $scope.saveNewClass = function() {
        var newClass = {
            className: $scope.className
        };
        $scope.dataFactory.sendNewClass(newClass).then(function() {
            $scope.dataFactory.factoryGetClassList().then(function() {
                $scope.classes = $scope.dataFactory.factoryClasses();
            });
        });
    };
    }});
}]);