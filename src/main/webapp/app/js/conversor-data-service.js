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
        
        conversorDataService.horaInvalida = function (string) { 
        	var invalida = false;
        	var finalHora = false;
        	if(string != null && string != undefined){
        	for (var i = 0, len = string.length; i < len; i++) {
        		  if(string[i] === '_' || string[i] === '' ){
        			  invalida = true;
        			  break; 
        		  }        		 
        		  if(i == 0) {        			  
        			  if(string[i] > 1){
	        			  invalida = true;
	        			  break;
        			  }
        		  }
        		  if(i == 1) {        			  
        			  if(string[i] > 8){
	        			  invalida = true;
	        			  break;
        			  } 
        			  if(string[i] == 8){
        				  finalHora = true;
        			  } else {
        				  finalHora = false;
        			  }
        		  }
        		  if(i == 3) {        			  
        			  if(string[i] > 5){
	        			  invalida = true;
	        			  break;
        			  }
        			  if(finalHora == true){
        				  if(string[i] > 0){
        					  invalida = true;
        					  break;
        				  }
        			  }
        		  }  
        		  if(i == 4) {
        			  if(finalHora == true){
        				  if(string[i] > 0){
        					  invalida = true;
        					  break;
        				  }
        			  }
        		  } 
        		  } 
        	}
        	return invalida;
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