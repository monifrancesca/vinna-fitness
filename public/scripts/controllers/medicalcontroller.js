myApp.controller('MedicalController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;

  $scope.dataFactory.retrieveMedical().then(function() {
    $scope.clientMedical = $scope.dataFactory.clientInfo();
    //console.log($scope.clientMedical);

    $scope.history = $scope.clientMedical[0];
    console.log($scope.history);

    $scope.currentInjuries = $scope.history.current_injuries;
    $scope.previousHistory = $scope.history.previous_medical_hist;
    $scope.otherMeds = $scope.history.medications;
    $scope.infection = $scope.history.infection;
    $scope.inflammation = $scope.history.inflammation;
    $scope.flu = $scope.history.flu;
    $scope.fever = $scope.history.fever;
    $scope.cold = $scope.history.cold;
    $scope.physiciansName = $scope.history.physician_name;
    $scope.physiciansPhone = parseInt($scope.history.physician_phone);
    $scope.lastMedical = $scope.history.last_medical;
    $scope.lastSig = $scope.history.signature;
    $scope.lastSigDate = $scope.history.signature_date;
    $scope.lastSigUnderAge = $scope.history.signature_under_age;
    $scope.lastSigDateUnderAge = $scope.history.signature_date_under_age;
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
      //console.log('history in controller', history);
        $scope.dataFactory.sendMedical(history);
     }

}]);