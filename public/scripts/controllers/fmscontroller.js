myApp.controller('FMSController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

  $scope.dataFactory = DataFactory;

  $scope.fmsData = {
    deepSquat: null,
    toeTouch: null,
    deepSquatDF: null,
    hurdleStep: null,
    leftLegUp: null,
    rightLegUp: null,
    hurdleDF: null,
    inLineLunge: null,
    leftLegForward: null,
    rightLegForward: null,
    lungeDF: null,
    shoulderMobility: null,
    leftTop: null,
    rightTop: null,
    leftImpingement: null,
    rightImpingement: null,
    shoulderDF: null,
    activeStraightLeg: null,
    leftLegRaise: null,
    rightLegRaise: null,
    legRaiseDF: null,
    trunkPushUp: null,
    pronePressUpTest: null,
    trunkDF: null,
    rotaryStability: null,
    kneelingLumbar: null,
    rotaryLeftUp: null,
    rotaryRightUp: null,
    rotaryDF: null,
    total: null,
    client_id: null,
    user_id: null,
    date: null,
    handDominance: null,
    swingDominance: null,
    throwDominance: null,
    legDominance: null,
    rightShinLength: null,
    leftShinLength: null,
    leftHandLength: null,
    rightHandLength: null
  };
  $scope.dominanceHeader = 'Dominance';
  $scope.dominanceStatus = true;
  $scope.conditionalButton = 'Submit';
  $scope.showHideDominance = function(){
    $scope.dominanceStatus ^= true;
    if($scope.dominanceStatus == false)
    {$scope.dominanceHeader = "Edit Dominance";} else {$scope.dominanceHeader = 'Dominance';}
  };
  $scope.deepSquatHeader = 'Deep Squat';
  $scope.deepSquatStatus = true;
  $scope.showHideDeepSquat = function(){
    $scope.deepSquatStatus ^= true;
    if($scope.deepSquatStatus == false)
    {$scope.deepSquatHeader = "Edit Deep Squat";} else {$scope.deepSquatHeader = 'Deep Squat';}
  };
  $scope.hurdleStepHeader = 'Hurdle Step';
  $scope.hurdleStepStatus = true;
  $scope.showHideHurdleStep = function(){
    $scope.hurdleStepStatus ^= true;
    if($scope.hurdleStepStatus == false)
    {$scope.hurdleStepHeader = "Edit Hurdle Step";} else {$scope.hurdleStepHeader = 'Hurdle Step';}
  };
  $scope.inLineLungeHeader = 'In-Line Lunge';
  $scope.inLineLungeStatus = true;
  $scope.showHideInLineLunge = function(){
    $scope.inLineLungeStatus ^= true;
    if($scope.inLineLungeStatus == false)
    {$scope.inLineLungeHeader = "Edit In-Line Lunge";} else {$scope.inLineLungeHeader = 'In-Line Lunge';}
  };
  $scope.shoulderMobilityHeader = 'Shoulder Mobility';
  $scope.shoulderMobilityStatus = true;
  $scope.showHideShoulderMobility = function(){
    $scope.shoulderMobilityStatus ^= true;
    if($scope.shoulderMobilityStatus == false)
    {$scope.shoulderMobilityHeader = "Edit Shoulder Mobility";} else {$scope.shoulderMobilityHeader = 'Shoulder Mobility';}
  };
  $scope.activeStraightLegHeader = 'Active Straight Leg Raise';
  $scope.activeStraightLegStatus = true;
  $scope.showHideActiveStraightLeg = function(){
    $scope.activeStraightLegStatus ^= true;
    if($scope.activeStraightLegStatus == false)
    {$scope.activeStraightLegHeader = "Edit Active Straight Leg Raise";} else {$scope.activeStraightLegHeader = 'Active Straight Leg Raise';}
  };
  $scope.trunkPushUpHeader = 'Trunk Stability Push Up';
  $scope.trunkPushUpStatus = true;
  $scope.showHideTrunkPushUp = function(){
    $scope.trunkPushUpStatus ^= true;
    if($scope.trunkPushUpStatus == false)
    {$scope.trunkPushUpHeader = "Edit Trunk Stability Push Up";} else {$scope.trunkPushUpHeader = 'Trunk Stability Push Up';}
  };
  $scope.rotaryStabilityHeader = 'Rotary Stability Quadruped';
  $scope.rotaryStabilityStatus = true;
  $scope.showHideRotaryStability = function(){
    $scope.rotaryStabilityStatus ^= true;
    if($scope.rotaryStabilityStatus == false)
    {$scope.rotaryStabilityHeader = "Edit Rotary Stability Quadruped";} else {$scope.rotaryStabilityHeader = 'Rotary Stability Quadruped';}
  };
}]);