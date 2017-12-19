define(['app'],function(app){
    app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

        $stateProvider.state('/main/home',{
            url:'/main/home',
            cache:false,
            templateUrl:'home/html/home.html',
            controller:'main_home',
            params:{
                id:123
            }
        });

        $urlRouterProvider.when("","/main/home");
    }]);
});