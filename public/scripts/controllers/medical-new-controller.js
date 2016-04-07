myApp.controller('NewMedicalController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;

    //variable for medical conditions
    var conditionsArray = [];


    //"Submit" function for form, takes all data from form
    $scope.saveMedical = function() {

        //Organizing data for the client_conditions join table
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


        // Organizing other form data
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

        // Sending form data to data factory
        $scope.dataFactory.sendMedical(history);
    }

}]);