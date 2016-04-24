myApp.controller('NewMedicalController', ['$scope', '$location', '$http', 'DataFactory', 'AuthFactory', '$window', function($scope, $location, $http, DataFactory, AuthFactory, $window) {


    var authFactory = AuthFactory;
    authFactory.isLoggedIn().then(function (response) {
        if (!response.data.status) {
            $window.location.href = '/';
        } else {
    $scope.dataFactory = DataFactory;
    $scope.info = {};
    $scope.info.intakeDate = new Date();
    $scope.info.signatureDateUnderAge = new Date();
    $scope.info.signatureDate = new Date();

    //variable for medical conditions
    var conditionsArray = [];


    //"Submit" function for form, takes all data from form
    $scope.saveMedical = function() {

        //Organizing data for the client_conditions join table
        if($scope.info.dislocations != undefined) {
            $scope.info.dislocations = 1;
            conditionsArray.push($scope.info.dislocations);
        }
        if ($scope.info.phlebitis != undefined) {
            $scope.info.phlebitis = 2;
            conditionsArray.push($scope.info.phlebitis);
        }
        if ($scope.info.neckInjuries != undefined) {
            $scope.info.neckInjuries = 3;
            conditionsArray.push($scope.info.neckInjuries);
        }
        if ($scope.info.lowBackPain != undefined) {
            $scope.info.lowBackPain = 4;
            conditionsArray.push($scope.info.lowBackPain);
        }
        if ($scope.info.bloodPressure != undefined) {
            $scope.info.bloodPressure = 5;
            conditionsArray.push($scope.info.bloodPressure);
        }
        if ($scope.info.heartProblems != undefined) {
            $scope.info.heartProblems = 6;
            conditionsArray.push($scope.info.heartProblems);
        }
        if ($scope.info.headaches != undefined) {
            $scope.info.headaches = 7;
            conditionsArray.push($scope.info.headaches);
        }
        if ($scope.info.arthritis != undefined) {
            $scope.info.arthritis = 8;
            conditionsArray.push($scope.info.arthritis);
        }
        if ($scope.info.nerves != undefined) {
            $scope.info.nerves = 9;
            conditionsArray.push($scope.info.nerves);
        }
        if ($scope.info.fainting != undefined) {
            $scope.info.fainting = 10;
            conditionsArray.push($scope.info.fainting);
        }

        // Organizing other form data
        var history = {
            intakeDate: $scope.info.intakeDate,
            currentInjuries: $scope.info.currentInjuries,
            previousHistory: $scope.info.previousHistory,
            otherMeds: $scope.info.otherMeds,
            infection: $scope.info.infection,
            inflammation: $scope.info.inflammation,
            flu: $scope.info.flu,
            fever: $scope.info.fever,
            cold: $scope.info.cold,
            conditions: conditionsArray,
            physiciansName: $scope.info.physiciansName,
            physiciansPhone: $scope.info.physiciansPhone,
            signature: $scope.info.signature,
            signatureDate: $scope.info.signatureDate,
            signatureUnderAge: $scope.info.signatureUnderAge,
            signatureDateUnderAge: $scope.info.signatureDateUnderAge
        };

        // Sending form data to data factory
        $scope.dataFactory.sendMedical(history);
        $location.path('existingclient');
    }
    }});
}]);