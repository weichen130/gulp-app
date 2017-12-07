define(['service'],function(service){
    'use strict';
    service.factory('http_service',['$http'],function($http){
        var http={
            get:function(url,params){
                this.post(url,params);
            },post:function(url,params){
                alert("http");
            }
        };
        return {
            _get:http.get,
            _post:http.post
        }
    });
});