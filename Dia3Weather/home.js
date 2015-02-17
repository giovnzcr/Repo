var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider

        .when('/test',{
            templateUrl: 'partial/test.html',
            controller: 'testCtrl'

    })

        .when('/clima/:Codigo/:Dias', {
            templateUrl : 'partial/clima.html',
            controller  : 'ParamHomeCtrl'
        });
});

myApp.service('ClimaService', function(){
    this.getWeatherIcon = function (weather) {

        var result='';

        var artlist = [{key:'Clear',url:'icons/art_clear.png'},
            {key: 'Clouds' , url:'icons/art_clouds.png'},
            {key: 'Fog', url:'icons/art_fog.png'},
            {key:'Llight Ccloulds',url:'icons/art_light_clouds.png'},
            {key:'Light Rain', url:'icons/art_light_rain.png'},
            {key: 'Rain', url:'icons/art_rain.png'},
            {key:'Snow',url:'icons/art_snow.png'},
            {key:'Storm', url:'icons/art_storm.png'}];

        angular.forEach(artlist, function(value, key) {

            if(value.key==weather)
                result= value.url;
        });

        return result;
    }
});

myApp.factory('ClimaFactory',['$http', '$q', function($http, $q) {

    var URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

    return{

        getClima: function(postalCode,count){

            var defer = $q.defer();

            $http({
                method:'GET',
                url:URL,
                params:{"q":postalCode,
                "mode":"json",
                "units":"metric",
                "cnt":count},
                dataType: 'jsonp',
                headers: {'Content-Type': 'application/json'}
            }).
                success(function(data, status, headers, config){
                    defer.resolve(data);
                }).
                error(function(data, status, headers, config){
                    defer.reject(data);
                });

            return defer.promise;


        }
    }


}]);

myApp.controller('HomeCtrl',['$scope','ClimaFactory','ClimaService',function($scope, clima,cservice){

    $scope.GetData = function(){
        clima.getClima($scope.Codigo,$scope.Dias).then( function(data){
            $scope.climas = data;
        });

        $scope.getWeatherIcon = function(item){
            return cservice.getWeatherIcon(item)}

    }



}]);

myApp.controller('ParamHomeCtrl',function($scope,$routeParams, ClimaFactory,ClimaService){

    ClimaFactory.getClima($routeParams.Codigo,$routeParams.Dias).then( function(data){

            $scope.climas = data;
        });
        $scope.getWeatherIcon = function(item){
            return ClimaService.getWeatherIcon(item)}





});

