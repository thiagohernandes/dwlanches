/**
 * Util
 * Thiago Hernandes de Souza
 * 18-07-2017
 * Métodos auxiliares
 * */

(function () {
    'use strict';

    var util = angular.module('dextra.util', []);

    util.factory('UtilService', function () {
        var utilService = {};
     
        utilService.isNullOrUndefined = function (p) {
        	var r = false;
        	if(p === null || p === undefined || p === '' || p === ' '){
        		r = true;
        	}
            return r;
        };
        
        utilService.formataStringToTime = function(string) {
        	 var r = new Date (new Date().toDateString() + ' ' + string);
         	return r;        	
        };        

        return utilService;
    });

}());