myApp.controller('MedicalController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;

    $scope.saveMedical = function() {
      console.log($scope.intakeDate);
      console.log($scope.currentInjuries);
        var history = {
          intakeDate: $scope.intakeDate,
          currentInjuries: $scope.currentInjuries
        };
        $scope.dataFactory.sendMedical(history);
     }

}]);