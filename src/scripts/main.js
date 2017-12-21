require.config({
    baseUrl:'.',
    paths:{
        angular:'../lib/angularJs/angular',
        angularRoute:'../lib/angular-ui-router/angular-ui-router',
        zepto:'../lib/zepto/zepto',
        jquery:'../lib/jQuery/jquery-3.2.1.min',
        bootstrap:'../lib/bootstrap/js/bootstrap',
        reg:'../scripts/reg',
        app:'../scripts/app'
    },
    shim:{
        angular:{
            exports: 'angular'
        },
        angularRoute:{
            deps:["angular"],
            exports: 'uiRoute'
        },
        bootstrap:{
            deps:["jquery"],
        }
    }
});
require(['angular','angularRoute','jquery','zepto','bootstrap','app','reg'],function(angular,angularRoute,$,zepto,bootstrap,app,reg){
    'use strict';
    angular.bootstrap(document,['myapp']);
});