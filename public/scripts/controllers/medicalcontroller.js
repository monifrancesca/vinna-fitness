myApp.controller('MedicalController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  var conditionsArray = [];

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
        //set up array for conditions
        var checkConditions = [$scope.dislocations, $scope.neckInjuries,
          $scope.bloodPressure, $scope.heartProblems, $scope.headaches,
          $scope.fainting, $scope.phlebitis, $scope.nerves];
        //loop over this, if != undefined, associate it with a # and push into conditionsArray
        angular.forEach(checkConditions, function(key, value){
          if() {
            $scope.dislocations = 1;
            conditionsArray[0] = $scope.dislocations;

            $scope.neckInjuries = 2;
            conditionsArray[1] = $scope.neckInjuries;

            $scope.bloodPressure = 3;
            conditionsArray[2] = $scope.bloodPressure;
            //if($scope.neckInjuries) {
            //  conditionsArray.push(2);
          }
        });

        console.log(checkConditions);


        //need to test this logic, but plan to put this array into the history object
        console.log(conditionsArray);

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
          //dislocations: $scope.dislocations,
          //neckInjuries: $scope.neckInjuries,
          //bloodPressure: $scope.bloodPressure,
          //heartProblems: $scope.heartProblems,
          //headaches: $scope.headaches,
          //fainting: $scope.fainting,
          //phlebitis: $scope.phlebitis,
          //nerves: $scope.nerves,
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