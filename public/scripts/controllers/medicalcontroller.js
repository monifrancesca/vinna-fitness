myApp.controller('MedicalController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  var conditionsArray = [];
    //var conditionHistory = [];
    //$scope.conditionHistory =

  $scope.dataFactory.retrieveMedical().then(function() {
    $scope.clientMedical = $scope.dataFactory.clientMedicalInfo();
    console.log($scope.clientMedical);

      for(var i = 0; i < $scope.clientMedical.length; i++) {
          if($scope.clientMedical[i].condition_id == 1) {
              $scope.prevDislocations = 'Dislocations';
          }
          if ($scope.clientMedical[i].condition_id == 2) {
              $scope.prevPhlebitis = 'Phlebitis';
          }
          if ($scope.clientMedical[i].condition_id == 3) {
              $scope.prevNeckInjuries = 'Neck injuries';
          }
          if ($scope.clientMedical[i].condition_id == 4) {
              $scope.prevLowBackPain = 'Low back pain';
          }
          if ($scope.clientMedical[i].condition_id == 5) {
              $scope.prevBloodPressure = 'High blood pressure';
          }
          if ($scope.clientMedical[i].condition_id == 6) {
              $scope.prevHeartProblems = 'Heart problems';
          }
          if ($scope.clientMedical[i].condition_id == 7) {
              $scope.prevHeadaches = 'Headaches';
          }
          if ($scope.clientMedical[i].condition_id == 8) {
              $scope.prevArthritis = 'Arthritis';
          }
          if ($scope.clientMedical[i].condition_id == 9) {
              $scope.prevNerves = 'Numbness/tingling/nerve conditions';
          }
          if ($scope.clientMedical[i].condition_id == 10) {
              $scope.prevFainting = 'Fainting spells';
          }

          //console.log('i', i);
      }

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
          if($scope.dislocations != undefined) {
            $scope.dislocations = 1;
            conditionsArray.push($scope.dislocations);
          }
          if ($scope.phlebitis != undefined) {
            $scope.phlebitis = 2;
            conditionsArray.push($scope.phlebitis);
          }
          if ($scope.neckInjuries != undefined) {
            $scope.neckInjuries = 3;
            conditionsArray.push($scope.neckInjuries);
          }
          if ($scope.lowBackPain != undefined) {
            $scope.lowBackPain = 4;
            conditionsArray.push($scope.lowBackPain);
          }
          if ($scope.bloodPressure != undefined) {
            $scope.bloodPressure = 5;
            conditionsArray.push($scope.bloodPressure);
          }
          if ($scope.heartProblems != undefined) {
            $scope.heartProblems = 6;
            conditionsArray.push($scope.heartProblems);
          }
          if ($scope.headaches != undefined) {
            $scope.headaches = 7;
            conditionsArray.push($scope.headaches);
          }
          if ($scope.arthritis != undefined) {
            $scope.arthritis = 8;
            conditionsArray.push($scope.arthritis);
          }
          if ($scope.nerves != undefined) {
            $scope.nerves = 9;
            conditionsArray.push($scope.nerves);
          }
          if ($scope.fainting != undefined) {
            $scope.fainting = 10;
            conditionsArray.push($scope.fainting);
          }

        //console.log(conditionsArray);

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
          conditions: conditionsArray,
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