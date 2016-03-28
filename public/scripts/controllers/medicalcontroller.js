myApp.controller('MedicalController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;

  $scope.dataFactory.retrieveMedical().then(function() {
    $scope.clientMedical = $scope.dataFactory.clientInfo();
    //console.log($scope.clientMedical);

    $scope.history = $scope.clientMedical[0];
    //console.log($scope.history);

    $scope.currentInjuries = $scope.history.current_injuries;
    $scope.previousHistory = $scope.history.previous_medical_hist;
    $scope.otherMeds = $scope.history.medications;
  });

    $scope.saveMedical = function() {
        var history = {
          intakeDate: $scope.intakeDate,
          currentInjuries: $scope.currentInjuries,
          previousHistory: $scope.previousHistory,
          otherMeds: $scope.otherMeds,
          infection: $scope.infection,
          inflammation: $scope.inflammation,
          flu: $scope.flu,
          fever: $scope.fever,
          cold: $scope.cold,
          dislocations: $scope.dislocations,
          neckInjuries: $scope.neckInjuries,
          bloodPressure: $scope.bloodPressure,
          heartProblems: $scope.heartProblems,
          headaches: $scope.headaches,
          fainting: $scope.fainting,
          phlebitis: $scope.phlebitis,
          nerves: $scope.nerves,
          physiciansName: $scope.physiciansName,
          physiciansPhone: $scope.physiciansPhone,
          signature: $scope.signature,
          signatureDate: $scope.signatureDate,
          signatureUnderAge: $scope.signatureUnderAge,
          signatureDateUnderAge: $scope.signatureDateUnderAge
        };
      console.log('history in controller', history);
        $scope.dataFactory.sendMedical(history);
     }

}]);