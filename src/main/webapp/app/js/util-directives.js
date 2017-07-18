/**
 * Util Directives
 * Thiago Hernandes de Souza
 * 18-07-2017
 * Directivas
 * */

(function () {
    'use strict';

    var util = angular.module('dextra.directives', []);

    util.directive('masktime', function($http) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
              
              var jquery_element = $(element);
              jquery_element.mask("99:99");              
              jquery_element.on('keyup paste focus blur', function() {
                var val = $(this).val();                
                ngModelCtrl.$setViewValue(val);
                ngModelCtrl.$render();                
              })
            }
          }
      });

}());