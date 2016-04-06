myApp.controller('NewMedicalController', ['$scope', '$location', '$http', 'DataFactory', function($scope, $location, $http, DataFactory) {

    $scope.dataFactory = DataFactory;
    $scope.client_conditions = [];
    $scope.client_shortTermConditions = [];

//  Using data factory to get previous medical information from the database
    $scope.dataFactory.retrieveMedical().then(function() {
        $scope.clientMedical = $scope.dataFactory.clientMedicalInfo();

        //Iterating through client conditions from the database to display on Dom
        for(var i = 0; i < $scope.clientMedical.length; i++) {
            if ($scope.clientMedical[i].condition_id == 1) {
                $scope.client_conditions.push('Dislocations');
            }
            if ($scope.clientMedical[i].condition_id == 2) {
                $scope.client_conditions.push('Phlebitis');
            }
            if ($scope.clientMedical[i].condition_id == 3) {
                $scope.client_conditions.push('Neck injuries');
            }
            if ($scope.clientMedical[i].condition_id == 4) {
                $scope.client_conditions.push('Low back pain');
            }
            if ($scope.clientMedical[i].condition_id == 5) {
                $scope.client_conditions.push('High blood pressure');

            }
            if ($scope.clientMedical[i].condition_id == 6) {
                $scope.client_conditions.push('Heart problems');

            }
            if ($scope.clientMedical[i].condition_id == 7) {
                $scope.client_conditions.push('Headaches');

            }
            if ($scope.clientMedical[i].condition_id == 8) {
                $scope.client_conditions.push('Arthritis');

            }
            if ($scope.clientMedical[i].condition_id == 9) {
                $scope.client_conditions.push('Numbness/tingling/nerve conditions');

            }
            if ($scope.clientMedical[i].condition_id == 10) {
                $scope.client_conditions.push('Fainting spells');
            }
        }
        console.log($scope.client_conditions);
        $scope.conditions = $scope.client_conditions;

        //  Taking client information from the database and displaying on the Dom
        $scope.history = $scope.clientMedical[0];

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

        //Setting text for last 24 hours symptoms
        if($scope.infection == true) {
            $scope.infection = 'Infection'
            $scope.client_shortTermConditions
        }
        if($scope.inflammation == true) {
            $scope.inflammation = 'Inflammation'
        }
    });

    $scope.newMedicalWindow = function() {
        $location.path('medical');
    }

}]);