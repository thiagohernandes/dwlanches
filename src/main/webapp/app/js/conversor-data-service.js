/**
 * Converso Data Service
 * Thiago Hernandes de Souza
 * 18-07-2017
 * JavaScript com funcionalidades de conversão/trativa de dados
 * */
(function () {
    'use strict';

    var date = angular.module('dextra.data', []);

    date.factory('ConversorDataService', function () {
        var conversorDataService = {};

        function preencherComZerosEsquerda(numero, tamanho) {
            var string = numero.toString();
            while (string.length < tamanho) {
                string = '0' + string;
            }
            return string;
        }
        
        function preencherComZerosDireita(numero, tamanho) {
            var string = numero.toString();
            while (string.length < tamanho) {
                string = string + '0';
            }
            return string;
        };
        
        
        conversorDataService.data = function (string) {
            var dma = string.split('/');
            return new Date(dma[2], dma[1] - 1, dma[0]);
        };

        conversorDataService.string = function (data) { 
        	var v;
        	if(data instanceof Date === false){
        		v = new Date(data);
        	} else {
        		v = data;
        	}
        	return preencherComZerosEsquerda(v.getDate(), 2) + "/" + 
        		   preencherComZerosEsquerda((v.getMonth() + 1), 2) + "/" + 
        		   preencherComZerosEsquerda(v.getFullYear(), 4);
        };
        
        conversorDataService.hora = function(p){ 
        	return p.getHours().toString()+':'+preencherComZerosEsquerda(p.getMinutes().toString(),2);
        };
       
        return conversorDataService;
    });

}());