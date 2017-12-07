define(['app'],function(app){
    app.controller('main_home',['$scope','$state','$stateParams',function($scope,$state,$stateParams){
        alert($stateParams.id);
        $scope.userId=$stateParams.id;
    }]);
});