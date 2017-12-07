require.config({
    baseUrl:'.',
    paths:{
        angular:'../lib/angularJs/angular',
        angularRoute:'../lib/angular-ui-router/angular-ui-router',
        zepto:'../lib/zepto/zepto',
        jquery:'../lib/jQuery/jquery-3.2.1.min',
        bootstrap:'../lib/bootstrap/js/bootstrap',
        controllers:'../templates/home/module',
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
require(['angular','angularRoute','jquery','zepto','bootstrap','app','controllers'],function(angular,angularRoute,$,zepto,bootstrap,app,controllers){
    'use strict';
    angular.bootstrap(document,['myapp']);
});