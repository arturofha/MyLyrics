var mylyrics = angular.module('mylyrics', ['ngRoute', 'firebase']);

mylyrics.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeCtrl'
        })

        .when('/lista', {
            templateUrl: 'pages/lista.html',
            controller: 'listaCtrl'
        })

        .when('/nueva', {
            templateUrl: 'pages/nueva.html',
            controller: 'nuevaCtrl'
        });



});

var config = {
    apiKey: "AIzaSyD2RPIBuIk7S1IDDwmzjyV9a3KS_9_KFC0",
    authDomain: "mylyrics-f8d4a.firebaseapp.com",
    databaseURL: "https://mylyrics-f8d4a.firebaseio.com",
    projectId: "mylyrics-f8d4a",
    storageBucket: "mylyrics-f8d4a.appspot.com",
    messagingSenderId: "84411834217"
};

firebase.initializeApp(config);

var db = firebase.database();
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

mylyrics.controller('nuevaCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

    db.ref('grupos').on('value', function (snapshot) {

        $timeout(function () {
            $scope.grupos = snapshot.val();
            console.log($scope.grupos);
        }, 0);

    });

    $scope.ingresaLetra = function () {

        
        var nombre = $('#nombre').val();       
        var espaniol = $('#lEspaniol').val();
        var ingles = $('#lIngles').val();

        $timeout(function () {
            db.ref('letras').push({
                nombre: nombre,               
                textoEsp: espaniol,
                textoIng: ingles
            });
        }, 0);

        alerta('success', 'Se ingresa correctamente');

        $('#nombreIng').val('');
        $('#nombreEsp').val('');
        $('#lEspaniol').val('');
        $('#lIngles').val('');

    };

    $scope.ingresaGrupo = function () {

       
        var grupo = $('#nGrupo').val();      

        $timeout(function () {
            db.ref('grupos').push({nombre: grupo});
        }, 0);

        alerta('success', 'Se ingresa el grupo correctamente');

        $('#nGrupo').val('');   
    };


    alerta = function (tipo, texto) {
        $('#alerta').html("").hide();
        obj = $("<div></div>");
        obj.addClass("alert").addClass("alert-" + tipo).html(texto);
        obj.append('<button type="button" class="close" data-dismiss="alert">&times;</button>');
        $('#alerta').append(obj).fadeIn();
    };



}]);

mylyrics.controller('listaCtrl', ['$scope','$timeout', function ($scope,$timeout) {

    db.ref('letras').on('value', function (snapshot) {

        $timeout(function () {
            $scope.canciones = snapshot.val();
            
        }, 0);

    });
    
    alerta = function (tipo, texto) {
        $('#alerta').html("").hide();
        obj = $("<div></div>");
        obj.addClass("alert").addClass("alert-" + tipo).html(texto);
        obj.append('<button type="button" class="close" data-dismiss="alert">&times;</button>');
        $('#alerta').append(obj).fadeIn();
    };

}]);


mylyrics.controller('homeCtrl', ['$scope', function () {

    alerta = function (tipo, texto) {
        $('#alerta').html("").hide();
        obj = $("<div></div>");
        obj.addClass("alert").addClass("alert-" + tipo).html(texto);
        obj.append('<button type="button" class="close" data-dismiss="alert">&times;</button>');
        $('#alerta').append(obj).fadeIn();
    };

}]);