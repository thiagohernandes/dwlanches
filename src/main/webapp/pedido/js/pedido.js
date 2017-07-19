/**
 * Dextra Processo Seletivo 
 * Thiago Hernandes de Souza
 * 18-08-2017
 * JavaScript com as funcionalidades de Pedidos
 *  */

(function () {
    'use strict';

    /** Principal
     *  módulos e variável principal do scopo
     * */ 
    var pedido = angular.module('dextra.pedidos', ['ngRoute', 
    													 'ui.bootstrap', 
    													 'angular-loading-bar', 
    													 'dextra.menu', 
    													 'dextra.data',
    													 'dextra.util',
    													 'ui.utils.masks']);
    
    /** Rotas da aplicação
     *  Definição
     * */ 
    pedido.config(['$routeProvider','uibDatepickerPopupConfig',
    					function ($routeProvider,uibDatepickerPopupConfig) {
        $routeProvider.when('/adicionar', {
            templateUrl: '/dw-lanches/pedido/html/editar.html',
            controller: 'EditarPedidoCtrl'
        }).when('/editar/:id', {
            templateUrl: '/dw-lanches/pedido/html/editar.html',
            controller: 'EditarPedidoCtrl'
        }).when('/consultar', {
            templateUrl: '/dw-lanches/pedido/html/consultar.html',
            controller: 'PesquisarPedidoCtrl'
        }).otherwise({
            redirectTo: '/consultar'
        });
        
        uibDatepickerPopupConfig.datepickerPopup = 'dd/MM/yyyy';
        uibDatepickerPopupConfig.closeText = "Fechar";
        uibDatepickerPopupConfig.currentText = "Hoje";
        uibDatepickerPopupConfig.clearText = "Limpar"; 
     
    }]);

    /**PesquisarPedidoCtrl
     * Controller de pesquisa que receberá a injeção de serviços
     * */ 
    pedido.controller('PesquisarPedidoCtrl', ['$scope',
    											   'PesquisaPedidoService', 
    											   'MensagensPedidoService',
    											   '$window',
    											   function ($scope, 
    													   	 pesquisaPedidoService, 
    													   	 mensagens,
    													   	 $window
    													   	 ) {
  
        $scope.pesquisaPedidoService = pesquisaPedidoService;
        $scope.limparFiltros = function (filtros) {
        	angular.forEach(filtros, function (filtro) {
        		delete $scope.pesquisaPedidoService.filtros[filtro];
        	});
        };
        
        $scope.somenteNumeros = /^\d+$/;
        $scope.mensagens = mensagens;
        $scope.datepickersAbertos = {
                datapedido : false
         };   
        $scope.pesquisaPedidoService.carregarComboClientes();
        $scope.pesquisaPedidoService.carregarComboLanches();
        
    }]);

    /**PesquisaPedidoService
     * factory/serviço de pesquisa de pedidos
     * */ 
    pedido.factory('PesquisaPedidoService', 
    											  ['$http', 
    											  'MensagensPedidoService', 
    											  '$q',
    											  'ConversorDataService',
    											  'UtilService',
    											  '$uibModal',
    											  function ($http, 
    													    mensagens,
    													    $q,
    													    conversorData,
    													    utilService,
    													    $uibModal) {
        var pesquisaPedidoService = {
            filtros: {},
            erros: [],
            resultadoPesquisa: [],            
            listaClientes : [],
            listaLanches : [],
            excluiu : false
        };       
        
        function montarFiltrosPesquisa() {
            var dataPedido = pesquisaPedidoService.filtros.datapedido;
            var params = {
            		datapedido: conversorData.string(dataPedido)
            };
            if (pesquisaPedidoService.filtros.cliente) {
            	params.clienteid = pesquisaPedidoService.filtros.cliente.id;
            }
            if (pesquisaPedidoService.filtros.lanche) {
            	params.lancheid = pesquisaPedidoService.filtros.lanche.id;
            }
            if (pesquisaPedidoService.filtros.numeropedido) {
            	params.numeropedido = pesquisaPedidoService.filtros.numeropedido;
            }
            return params;
        };
                         
        pesquisaPedidoService.limpar = function () {
        	pesquisaPedidoService.filtros = {};
        	pesquisaPedidoService.erros = [];
        	pesquisaPedidoService.resultadoPesquisa = [];
        	pesquisaPedidoService.nenhumRegistroEncontrado = false; 
        	pesquisaPedidoService.excluiu = false;
        };
        
        pesquisaPedidoService.confirmarExclusao = function(codigo){   
        	    var modalInstance = $uibModal.open({
        	        templateUrl: '/dw-lanches/pedido/html/modal-confirmacao.html',
        	        controller: 'ModalInstanceConfirmacaoCtrl',
        	        controllerAs : '$ctrl',
        	        size: 'sm'
        	    	}).result.then(function(result) {
        				if(result){ 
        					excluir(codigo);	
        				}
        			});         	        
        }; 
        
        function excluir(codigo) {              
                	var resultado = $q.defer();
                    $http.delete('/dw-lanches/rest/pedidos/excluir/' + codigo).then(function (response) {
                    	pesquisaPedidoService.limpar(); 
                    	pesquisaPedidoService.excluiu = true;
                        resultado.resolve(pedido);                
                    }, function (response) {
                        resultado.reject(response.data);
                    });                 
        };

        pesquisaPedidoService.pesquisar = function () { 
        	pesquisaPedidoService.excluiu = false;
        	pesquisaPedidoService.resultadoPesquisa = [];
        	pesquisaPedidoService.erros = [];
                $http.get('/dw-dextra/rest/pedidos/pesquisar/',{params : montarFiltrosPesquisa()}).then(
                    function (response) { 
                    	pesquisaPedidoService.resultadoPesquisa = response.data;
                    	pesquisaPedidoService.nenhumRegistroEncontrado =
                    		(pesquisaPedidoService.resultadoPesquisa.length === 0);            			
                    },
                    function (response) {
                            window.console.log(response);
                            window.alert(mensagens.erro_ao_pesquisar);
                    }
                );
        };
        
        pesquisaPedidoService.carregarComboClientes = function() {                  		
            $http.get('/dw-lanches/rest/clientes/todos').then(function (response) {            	
            	pesquisaPedidoService.listaClientes = response.data;            	
            }, function (response) {
                    window.console.log(response);
                    window.alert(mensagens.erro_carregar_medicos_especialidades);
            });            
        };  
        
        
        pesquisaPedidoService.carregarComboLanches = function() {                  		
            $http.get('/dw-lanches/rest/lanches/todos').then(function (response) {            	
            	pesquisaPedidoService.listaLanches = response.data;            	
            }, function (response) {
                    window.console.log(response);
                    window.alert(mensagens.erro_carregar_postos_coleta);
            });            
        }; 
                
        return pesquisaPedidoService;
    }]);

    /**EdicaoPedidoService
     * factory/serviço de edição de pedidos
     * */ 
    pedido.factory('EdicaoPedidoService', ['$http', 
    											'$q', 
    											'MensagensPedidoService', 
    											'PesquisaPedidoService',
    											'ConversorDataService',
  											  	'UtilService',
    											function ($http, 
    													  $q, 
    													  mensagens,
    													  pesquisaPedidoService,
    													  conversorData,
    	    											  utilService) {
        var edicaoPedidoService = {
                listaClientes : [],
                listaLanches : [],
                listaIngredientes : [],
                listaLanchesSelecionados : [],
                listaIngredientesSelecionados : [],
                erros : []
        };
        
        function validar(pedido, resultado) {
            
        	edicaoPedidoService.erros = [];
        	
            if(utilService.isNullOrUndefined(pedido.cliente)){
            	edicaoPedidoService.erros.push(mensagens.informe_o_cliente);            	
            }
            if(utilService.isNullOrUndefined(pedido.datapedido)){
            	edicaoPedidoService.erros.push(mensagens.informe_a_data_pedido);
            }
            
            if (edicaoPedidoService.erros.length !== 0) {
                resultado.reject(edicaoPedidoService.erros);
                return false;
            }
            return true;
        }
        
        function montarDados(pedido) { 
        	var dados = {};
        	dados.cliente.id = pedido.cliente.id;
        	dados.pedido.data = moment(pedido.datapedido).format('DD/MM/YYYY');
        	dados.vltotal = pedido.vltotal;
        	
        	dados.lanches.id = [];        	
        	for(var i = 0; i < pedido.listaLanchesSelecionados; i++){
        		dados.lanches.id.push(pedido.listaLanchesSelecionados.id); 
        	}
        	
        	dados.ingredientes = [];
        	for(var i = 0; i < pedido.listaIngredientesSelecionados; i++){
        		dados.ingredientes.id.push(pedido.listaIngredientesSelecionados.id); 
        	}
            return dados;
        }

        function atualizar(pedido, resultado) { 
            $http.put('/dw-lanches/rest/pedidos/alterar/' + pedido.id, montarDados(pedido)).then(function (response) {
                resultado.resolve(pedido);
            }, function (response) {
            	alert("Houve algum problema!");
                resultado.reject(response.data);
            });
        }

        function criar(pedido, resultado) {        	
            $http.post('/dw-lanches/rest/pedidos/novo', montarDados(pedido)).then(function (response) {
                resultado.resolve(response.data);
            }, function (response) {
            	if(response.status == 500){
            		alert("Houve algum problema interno!");
            	}
                resultado.reject(response.data);
            });
        }

        edicaoPedidoService.carregar = function (id) { 
            var resultado = $q.defer();
            $http.get('/dw-lanches/rest/pedidos/id/' + id).then(function (response) {
                resultado.resolve(response.data);
            }, function (response) {
            	alert("Houve algum problema!");
                resultado.reject(response.data);
            });
            return resultado.promise;
        };
       
        edicaoPedidoService.salvar = function (pedido,alterando) { 
            var resultado = $q.defer();
            if (validar(pedido, resultado)) {
                if (pedido === true) {
                    atualizar(pedido, resultado);
                } else {                	
                    criar(pedido, resultado);
                }
                edicaoPedidoService.resultadoPesquisa = [];
            }
            return resultado.promise;
        };
        
        edicaoPedidoService.carregarComboClientes = function() {                  		
            $http.get('/dw-lanches/rest/clientes/todos').then(function (response) {            	
            	edicaoPedidoService.listaClientes = response.data;            	
            }, function (response) {
            	if (response.status === 400 && response.data.erros) {
            		edicaoPedidoService.erros = response.data.erros;
                } else {
                    window.console.log(response);
                    window.alert(mensagens.erro_carregar_medicos_especialidades);
                }
            });            
        };  
        
        edicaoPedidoService.carregarComboLanches = function() {                  		
            $http.get('/dw-lanches/rest/lanches/todos').then(function (response) {            	
            	edicaoPedidoService.listaLanches = response.data;            	
            }, function (response) {            	
                    window.console.log(response);
                    window.alert(mensagens.erro_carregar_convenios);               
            });            
        }; 

        return edicaoPedidoService;
    }]);

    /**EditarPedidoCtrl
     * Controller de edição de pedidos que receberá a injeção de servicos
     * */ 
    pedido.controller('EditarPedidoCtrl', 
    											['$scope',
    											'$routeParams', 
    											'$timeout', 
    											'EdicaoPedidoService', 
    											'MensagensPedidoService',    											
    											'$uibModal',
    											'UtilService',
    											'$http',
    											'ConversorDataService',
    											'$filter',
    											'PesquisaPedidoService',    											
                                                 function ($scope,
                                                		   $routeParams, 
                                                		   $timeout, 
                                                		   edicaoPedidoService, 
                                                		   mensagens,
                                                		   $uibModal,
                                                		   utilService,
                                                		   $http,
                                                		   conversorData,
                                                		   $filter,
                                                		   pesquisaPedidoService) {
    												
        $scope.pesquisaPedidoService = pesquisaPedidoService;
    	$scope.mensagens = mensagens;
    	$scope.edicaoPedidoService = edicaoPedidoService;
    	
    	$scope.carregarCombos = function(){
            $scope.pesquisaPedidoService.carregarComboClientes();
            $scope.pesquisaPedidoService.carregarComboLanches();
    	};
    	
    	 $scope.inicializarAtributos = function(){
         	$scope.pedido = {
                     cliente : {},
                 	 datapedido : null,
                     vltotal : 0.00,
                     listaLanchesSelecionados : [],
                     listaIngredientesSelecionados : []
                 };
         };

    	if ($routeParams.id) { 
    		$scope.inicializarAtributos();
    		$scope.carregarCombos();
    		edicaoPedidoService.carregar($routeParams.id).then(function (pedido) { 
                $scope.pedido.datapedido = pedido[0].datapedido;
                $scope.pedido.vltotal = pedido[0].vltotal;
    		
    		 var indexCliente = -1;
	         for(var i = 0, len = $scope.edicaoPedidoService.listaClientes.length; i < len; i++) {
	        	if ($scope.edicaoPedidoService.listaClientes[i].cliente === pedido[0].cliente) {
	        		indexCliente = i;
	        	  break;
	        	}
	         }               	
             $scope.pedido.cliente = $scope.edicaoPedidoService.listaClientes[indexCliente]; 
                           			   			
             $scope.alterando = true;
             
            }, function (erros) {
                $scope.edicaoPedidoService.erros = erros;
            });
        } else {
        	$scope.inicializarAtributos();
            $scope.edicaoPedidoService.erros = [];
            $scope.salvoComSucesso = false;
            $scope.alterando = false;
            $scope.carregarCombos();
        }

        $scope.salvar = function () { 
        	edicaoPedidoService.salvar($scope.pedido,$scope.alterando).then(function (resultado) {                
                $scope.edicaoPedidoService.erros = [];
                $scope.salvoComSucesso = true;
                setTimeout(function(){ 
                	window.location.href = "#/consultar";
                	}, 2000);
            }, function (erros) {
                $scope.edicaoPedidoService.erros = erros;
                $scope.salvoComSucesso = false;
            });
        };
        
        $scope.cancelar = function(){
        	$scope.inicializarAtributos();        	
            $scope.edicaoPedidoService.erros = [],
            $scope.pesquisaPedidoService.excluiu = false;
            $scope.salvoComSucesso = false; 
            $scope.alterando = false;
            
            window.location.href = "#/consultar";
        };
        
    }]);
    
    /**Factory de Mensagens
     * factory/serviço que realiza o carregamento de mensagens no formato JSON
     * */ 
    pedido.factory('MensagensPedidoService', ['$http', function($http) {
        var mensagens = {};
    	$http.get('/dw-lanches/pedido/mensagens.json').then(function (response) {
    		angular.copy(response.data, mensagens);
    	});    	
    	return mensagens;
    }]);
    
    /**ModalInstanceConfirmacaoCtrl
     * Controller da modal de confirmação de exclusão
     * */
    pedido.controller('ModalInstanceConfirmacaoCtrl',
			['$uibModalInstance','$scope',
            function ($uibModalInstance,$scope) { 
		var $ctrl = this;   	  
		$ctrl.ok = function () {    		
		$uibModalInstance.close(true);
		};
		
		$ctrl.cancelar = function () {
		$uibModalInstance.dismiss('cancel');
		};
		
		}]); 
    
}());