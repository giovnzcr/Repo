var myApp = angular.module('myApp', []);

myApp.service('ClimaService', function(){
    this.getWeatherIcon = function (weather) {

        var result='';

        var artlist = [{key:'clear',url:'icons/art_clear.png'},
            {key: 'Clouds' , url:'icons/art_clouds.png'},
            {key: 'fog', url:'icons/art_fog.png'},
            {key:'light cloulds',url:'icons/art_light_clouds.png'},
            {key:'light rain', url:'icons/art_light_rain.png'},
            {key: 'Rain', url:'icons/art_rain.png'},
            {key:'snow',url:'icons/art_snow.png'},
            {key:'storm', url:'icons/art_storm.png'}];

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

