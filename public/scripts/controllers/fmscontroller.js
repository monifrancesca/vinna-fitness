myApp.controller('FMSController', ['$scope', '$location', '$http', 'DataFactory', function($scope, $location, $http, DataFactory) {

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
    client_id: 4,
    user_id: 1,
    date: null,
    handDominance: null,
    swingDominance: null,
    throwDominance: null,
    legDominance: null,
    shinLength: null,
    handLength: null,
    location: null
  };

  $scope.locations = [];
  $scope.handMultiplyer = null;
  $scope.searchName = {};
  $scope.names = [];

  $scope.dataFactory.getLocation().then(function(){
    $scope.locations = $scope.dataFactory.getLocationVariable();
  });

  $scope.nameQuery = function() {
    var query = $scope.searchName.query;
    console.log('name query', query);
    if (query.length >= 1) {
      console.log('This is the query', query);
      $scope.dataFactory.factorySearchClient(query).then(function() {
        $scope.names = $scope.dataFactory.factoryNameQuery();
        console.log('These are the results', $scope.names);
      });
    }
    else {
      $scope.names = [];
    }
  };

  $scope.selectName = function(id, firstName, lastName){
    $scope.searchName.query = firstName + ' ' + lastName;
    $scope.names = [];
    $scope.formData.client_id = $scope.dataFactory.factoryGetClientId(id);
  };


  //$scope.dominanceHeader = 'Dominance';
  //$scope.dominanceStatus = true;
  //$scope.conditionalButton = 'Submit';
  //$scope.showHideDominance = function(){
  //  $scope.dominanceStatus ^= true;
  //  $scope.deepSquatStatus ^= true;
  //  if($scope.dominanceStatus == false)
  //  {$scope.dominanceHeader = "Edit Dominance";} else {$scope.dominanceHeader = 'Dominance';}
  //};
  //$scope.deepSquatHeader = 'Deep Squat';
  //$scope.deepSquatStatus = true;
  //$scope.showHideDeepSquat = function(){
  //  $scope.deepSquatStatus ^= true;
  //  $scope.hurdleStepStatus ^= true;
  //  if($scope.deepSquatStatus == true)
  //  {$scope.deepSquatHeader = "Edit Deep Squat";} else {$scope.deepSquatHeader = 'Deep Squat';}
  //};
  //$scope.hurdleStepHeader = 'Hurdle Step';
  //$scope.hurdleStepStatus = true;
  //$scope.showHideHurdleStep = function(){
  //  $scope.hurdleStepStatus ^= true;
  //  $scope.inLineLungeStatus ^= true;
  //  if($scope.hurdleStepStatus == true)
  //  {$scope.hurdleStepHeader = "Edit Hurdle Step";} else {$scope.hurdleStepHeader = 'Hurdle Step';}
  //};
  //$scope.inLineLungeHeader = 'In-Line Lunge';
  //$scope.inLineLungeStatus = true;
  //$scope.showHideInLineLunge = function(){
  //  $scope.inLineLungeStatus ^= true;
  //  $scope.shoulderMobilityStatus ^= true;
  //  if($scope.inLineLungeStatus == true)
  //  {$scope.inLineLungeHeader = "Edit In-Line Lunge";} else {$scope.inLineLungeHeader = 'In-Line Lunge';}
  //};
  //$scope.shoulderMobilityHeader = 'Shoulder Mobility';
  //$scope.shoulderMobilityStatus = true;
  //$scope.showHideShoulderMobility = function(){
  //  $scope.shoulderMobilityStatus ^= true;
  //  $scope.activeStraightLegStatus ^= true;
  //  if($scope.shoulderMobilityStatus == true)
  //  {$scope.shoulderMobilityHeader = "Edit Shoulder Mobility";} else {$scope.shoulderMobilityHeader = 'Shoulder Mobility';}
  //};
  //$scope.activeStraightLegHeader = 'Active Straight Leg Raise';
  //$scope.activeStraightLegStatus = true;
  //$scope.showHideActiveStraightLeg = function(){
  //  $scope.activeStraightLegStatus ^= true;
  //  $scope.trunkPushUpStatus ^= true;
  //  if($scope.activeStraightLegStatus == true)
  //  {$scope.activeStraightLegHeader = "Edit Active Straight Leg Raise";} else {$scope.activeStraightLegHeader = 'Active Straight Leg Raise';}
  //};
  //$scope.trunkPushUpHeader = 'Trunk Stability Push Up';
  //$scope.trunkPushUpStatus = true;
  //$scope.showHideTrunkPushUp = function(){
  //  $scope.trunkPushUpStatus ^= true;
  //  $scope.rotaryStabilityStatus ^= true;
  //  if($scope.trunkPushUpStatus == true)
  //  {$scope.trunkPushUpHeader = "Edit Trunk Stability Push Up";} else {$scope.trunkPushUpHeader = 'Trunk Stability Push Up';}
  //};
  //$scope.rotaryStabilityHeader = 'Rotary Stability Quadruped';
  //$scope.rotaryStabilityStatus = true;
  //$scope.showHideRotaryStability = function(){
  //  $scope.rotaryStabilityStatus ^= true;
  //  $scope.totalFmsStatus ^= true;
  //  if($scope.rotaryStabilityStatus == true)
  //  {$scope.rotaryStabilityHeader = "Edit Rotary Stability Quadruped";} else {$scope.rotaryStabilityHeader = 'Rotary Stability Quadruped';}
  //};
  //$scope.totalFmsHeader = 'Total Score';
  //$scope.totalFmsStatus = true;
  //$scope.showHideTotalFms = function(){
  //  $scope.totalFmsStatus ^= true;
  //  if($scope.totalFmsStatus == true)
  //  {$scope.totalFmsHeader = "Edit Total Score";} else {$scope.totalFmsHeader = 'Total Score';}
  //};
  $scope.sendData = function(){
    $scope.dataFactory.postFmsData($scope.fmsData);
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
      client_id: 4,
      user_id: 1,
      date: null,
      handDominance: null,
      swingDominance: null,
      throwDominance: null,
      legDominance: null,
      shinLength: null,
      handLength: null,
      location: null
    };
  };

  //$scope.getData = function(){
  //  $scope.dataFactory.getFmsData()
  //};

  $scope.hurdleTotal = function(){
    if($scope.fmsData.leftLegUp <= $scope.fmsData.rightLegUp){$scope.fmsData.hurdleStep = $scope.fmsData.leftLegUp}
    else{$scope.fmsData.hurdleStep = $scope.fmsData.rightLegUp}
  };
  $scope.lungeTotal = function(){
    if($scope.fmsData.leftLegForward <= $scope.fmsData.rightLegForward){$scope.fmsData.inLineLunge = $scope.fmsData.leftLegForward}
    else{$scope.fmsData.inLineLunge = $scope.fmsData.rightLegForward}
  };
  $scope.shoulderTotal = function(){
    if($scope.fmsData.leftTop <= $scope.fmsData.rightTop){$scope.fmsData.shoulderMobility = $scope.fmsData.leftTop}
    else{$scope.fmsData.shoulderMobility = $scope.fmsData.rightTop}
  };
  $scope.legRaiseTotal = function(){
    if($scope.fmsData.leftLegRaise <= $scope.fmsData.rightLegRaise){$scope.fmsData.activeStraightLeg = $scope.fmsData.leftLegRaise}
    else{$scope.fmsData.activeStraightLeg = $scope.fmsData.rightLegRaise}
  };
  $scope.rotaryTotal = function(){
    if($scope.fmsData.rotaryLeftUp <= $scope.fmsData.rotaryRightUp){$scope.fmsData.rotaryStability = $scope.fmsData.rotaryLeftUp}
    else{$scope.fmsData.rotaryStability = $scope.fmsData.rotaryRightUp}
  };

  //if($scope.fmsData.deepSquat == null || $scope.fmsData.hurdleStep == null || $scope.fmsData.inLineLunge == null || $scope.fmsData.shoulderMobility == null ||
  //  $scope.fmsData.activeStraightLeg == null || $scope.fmsData.trunkPushUp == null || $scope.fmsData.rotaryStability == null){
  //  $scope.fmsData.total = '';
  //} else {
  //  $scope.fmsData.total = $scope.fmsData.deepSquat + $scope.fmsData.hurdleStep + $scope.fmsData.inLineLunge + $scope.fmsData.shoulderMobility
  //    + $scope.fmsData.activeStraightLeg + $scope.fmsData.trunkPushUp + $scope.fmsData.rotaryStability;
  //}

  $scope.$watchCollection('fmsData', function(){
    if($scope.fmsData.deepSquat == null || $scope.fmsData.hurdleStep == null || $scope.fmsData.inLineLunge == null || $scope.fmsData.shoulderMobility == null ||
      $scope.fmsData.activeStraightLeg == null || $scope.fmsData.trunkPushUp == null || $scope.fmsData.rotaryStability == null){
      $scope.fmsData.total = '';
    } else {
      $scope.fmsData.total = parseInt($scope.fmsData.deepSquat) + parseInt($scope.fmsData.hurdleStep) + parseInt($scope.fmsData.inLineLunge) + parseInt($scope.fmsData.shoulderMobility)
        + parseInt($scope.fmsData.activeStraightLeg) + parseInt($scope.fmsData.trunkPushUp) + parseInt($scope.fmsData.rotaryStability);
    }
    $scope.handMultiplyer = ($scope.fmsData.handLength * 1.5).toFixed(2);
  });

}]);