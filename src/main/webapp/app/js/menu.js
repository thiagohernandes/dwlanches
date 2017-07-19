/**
 * Carregamento dinâmico do menu
 * Thiago Hernandes de Souza
 * 18-07-2017
 * JavaScript com o carregamento dinâmico do menu
 * */
(function () {
    'use strict';

    var menu = angular.module('dextra.menu', []);

    menu.controller('MenuCtrl', ['$scope', '$http', function ($scope, $http) {
    	
    	$scope.carregarMenu = function(){
		    $http.get('/dw-lanches/rest/menu').then(function (response) {
		        $scope.opcoesMenu = response.data;
		    }, function (response) {
		        window.alert('Ocorreu um erro ao carregar o menu!');
		    });
    	}
    	$scope.carregarMenu();
        
    }]);
}());
