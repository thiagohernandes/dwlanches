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
        }).when('/personalizar', {
            templateUrl: '/dw-lanches/pedido/html/personalizar.html',
            controller: 'PersonalizarLancheCtrl'
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
    											   '$uibModal',
    											   function ($scope, 
    													   	 pesquisaPedidoService, 
    													   	 mensagens,
    													   	 $window,
    													   	 $uibModal
    													   	 ) {
  
        $scope.pesquisaPedidoService = pesquisaPedidoService;
        $scope.limparFiltros = function (filtros) {
        	angular.forEach(filtros, function (filtro) {
        		delete $scope.pesquisaPedidoService.filtros[filtro];
        	});
        };
        
        $scope.mensagens = mensagens;
        $scope.datepickersAbertos = {
                datapedido : false
         };   
        
        $scope.pesquisaPedidoService.carregarComboClientes();
        $scope.pesquisaPedidoService.carregarComboLanches();
        
        $scope.abrirModalLanches = function(pedido,id){  
        	$scope.pesquisaPedidoService.lanchesPedido(id);
        	    var modalInstance = $uibModal.open({
        	        templateUrl: '/dw-lanches/pedido/html/modal-lanches.html',
        	        controller: 'ModalLancheCtrl',
        	        controllerAs : '$ctrl',
        	        size: 'sm',
        	        scope: $scope,
        	        bindToController: true,
        	        resolve: {
        	        	pedido: function () {
        	              return pedido;
        	            }
        	        }
        	    	}).result.then(function(result) { 
        			});         	        
        }; 
        
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
        
        function validarFiltrosPesquisa() { 
        	var resultado = true;
            if(
            	(!utilService.isNullOrUndefined(pesquisaPedidoService.filtros.cliente) &&
            		!utilService.isNullOrUndefined(pesquisaPedidoService.filtros.numeropedido) &&
            				!utilService.isNullOrUndefined(pesquisaPedidoService.filtros.datapedido))
            				||
            	(!utilService.isNullOrUndefined(pesquisaPedidoService.filtros.cliente) &&
            	     		!utilService.isNullOrUndefined(pesquisaPedidoService.filtros.numeropedido))
            	     		||
            	(!utilService.isNullOrUndefined(pesquisaPedidoService.filtros.numeropedido) &&
                    		!utilService.isNullOrUndefined(pesquisaPedidoService.filtros.datapedido))  
                    		||
                (!utilService.isNullOrUndefined(pesquisaPedidoService.filtros.cliente) &&
                    		!utilService.isNullOrUndefined(pesquisaPedidoService.filtros.datapedido))
            				){
            	pesquisaPedidoService.limpar();
            	resultado = false;
            	pesquisaPedidoService.erros.push(mensagens.pesquina_nao_permitida);            	
            }
            return resultado;
        };
        
        function montarFiltrosPesquisa() { 
        	var params = {};
        	if(pesquisaPedidoService.filtros.datapedido){
        		var dataPedido = pesquisaPedidoService.filtros.datapedido;
            	params.datapedido = conversorData.string(dataPedido);
            }
            if (pesquisaPedidoService.filtros.cliente) {
            	params.clienteid = pesquisaPedidoService.filtros.cliente.id;
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
        
        pesquisaPedidoService.lanchesPedido = function (id) {              
        	  $http.get('/dw-lanches/rest/pedidos/lanches/'+id).then(
                      function (response) { 
                      	pesquisaPedidoService.resultadoPesquisaLanches = response.data;
                      },
                      function (response) {
                              window.console.log(response);
                              window.alert(mensagens.erro_ao_pesquisar);
                      }
                  );           
        };
        
        function excluir(codigo) {              
                	var resultado = $q.defer();
                    $http.delete('/dw-lanches/rest/pedidos/excluir/' + codigo).then(function (response) { 
                    	pesquisaPedidoService.limpar(); 
                    	pesquisaPedidoService.excluiu = true;
                        resultado.resolve(pedido);                
                    }, function (response) {
                    	window.console.log(response);
                        window.alert(mensagens.erro_ao_excluir); 
                        resultado.reject(response.data);
                    });                 
        };

        pesquisaPedidoService.pesquisar = function () { 
        	pesquisaPedidoService.excluiu = false;
        	pesquisaPedidoService.resultadoPesquisa = [];
        	pesquisaPedidoService.erros = [];
        	if (validarFiltrosPesquisa()) {
                $http.get('/dw-lanches/rest/pedidos/pesquisar/',{params : montarFiltrosPesquisa()}).then(
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
            }
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
                listaLanchesSelecionados : [],
                listaPromocoes : [],
                erros : []
        };
        
        function validar(pedido, resultado) {
            
        	edicaoPedidoService.erros = [];        	
            if(utilService.isNullOrUndefined(pedido.cliente)
            		|| utilService.isNullOrUndefined(pedido.datapedido)
            		|| pedido.listaLanchesSelecionados.length < 1
            		|| utilService.isNullOrUndefined(pedido.qtd)
            		){
            	edicaoPedidoService.erros.push(mensagens.gravacao_nao_permitida);            	
            }
            if (edicaoPedidoService.erros.length !== 0) {
                resultado.reject(edicaoPedidoService.erros);
                return false;
            }
            return true;
        }
        
        function montarDados(pedido) {  
        	var dados = {
        			cliente : {},
        			pedido : {},
        			vltotal : 0.00,
        			lanches : []
        			
        	};
        	dados.cliente.id = pedido.cliente.id;
        	if(pedido.datapedido instanceof Date === true){
        		dados.pedido.data = conversorData.string(pedido.datapedido);
        	} else {
        	dados.pedido.data = pedido.datapedido;
        	}
        	dados.pedido.vltotal = pedido.vltotal;
        	if(!utilService.isNullOrUndefined(pedido.numeropedido)){
        	dados.pedido.numeropedido = pedido.numeropedido;
        	}
        	
        	for(var i = 0; i < pedido.listaLanchesSelecionados.length; i++){
        		dados.lanches.push(pedido.listaLanchesSelecionados[i].id+"-"+
        						   pedido.listaLanchesSelecionados[i].valorTotal+"-"+
        						   pedido.listaLanchesSelecionados[i].qtd+"-"+
        						   pedido.listaLanchesSelecionados[i].nome); 
        	}
        
            return dados;
        }

        function atualizar(pedido, resultado) { 
            $http.put('/dw-lanches/rest/pedidos/alterar', montarDados(pedido)).then(function (response) {
                resultado.resolve(pedido);
            }, function (response) {
            	window.console.log(response);
                window.alert(mensagens.erro_ao_atualizar);
                resultado.reject(response.data);
            });
        }

        function criar(pedido, resultado) {        	
            $http.post('/dw-lanches/rest/pedidos/novo', montarDados(pedido)).then(function (response) {
                resultado.resolve(response.data);
            }, function (response) {
            	window.console.log(response);
                window.alert(mensagens.erro_ao_criar);
                resultado.reject(response.data);
            });
        }

        edicaoPedidoService.carregar = function (id) { 
            var resultado = $q.defer();
            $http.get('/dw-lanches/rest/pedidos/id/' + id).then(function (response) { 
                resultado.resolve(response.data);
            }, function (response) {
            	window.console.log(response);
                window.alert(mensagens.erro_ao_carregar);
                resultado.reject(response.data);
            });
            return resultado.promise;
        };

        edicaoPedidoService.salvar = function (pedido,alterando) { 
            var resultado = $q.defer();
            if (validar(pedido, resultado)) {
                if (alterando === true) {
                    atualizar(pedido, resultado);
                } else {                	
                    criar(pedido, resultado);
                }
                pesquisaPedidoService.resultadoPesquisa = [];
            }
            return resultado.promise;
        };
        
        edicaoPedidoService.carregarComboClientes = function() {                  		
            $http.get('/dw-lanches/rest/clientes/todos').then(function (response) {            	
            	edicaoPedidoService.listaClientes = response.data;            	
            }, function (response) {
            	window.console.log(response);
                window.alert(mensagens.erro_carregar_clientes);
            });            
        };  
        
        edicaoPedidoService.carregarComboLanches = function() {                  		
            $http.get('/dw-lanches/rest/lanches/todos').then(function (response) {            	
            	edicaoPedidoService.listaLanches = response.data;            	
            }, function (response) {            	
                    window.console.log(response);
                    window.alert(mensagens.erro_carregar_lanches);               
            });            
        }; 
        
        edicaoPedidoService.carregarComboPromocoes = function() {                  		
            $http.get('/dw-lanches/rest/promocoes/todas').then(function (response) {            	
            	edicaoPedidoService.listaPromocoes = response.data;            	
            }, function (response) {            	
                    window.console.log(response);
                    window.alert(mensagens.erro_carregar_promocoes);               
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
    	
    	$scope.datepickersAbertos = {
                datapedido : false
         }; 
    	
    	$scope.carregarCombos = function(){
            $scope.edicaoPedidoService.carregarComboClientes();
            $scope.edicaoPedidoService.carregarComboLanches();
            $scope.edicaoPedidoService.carregarComboPromocoes();
    	};
    	
    	 $scope.inicializarAtributos = function(){
         	$scope.pedido = {
                     cliente : {},
                 	 datapedido : null,
                 	 lanche : {},
                     vltotal : 0.00,
                     listaLanchesSelecionados : [],
                     qtd : null
                 };
         };

    	if ($routeParams.id) {  
    		$scope.inicializarAtributos();
    		$scope.carregarCombos();
    		edicaoPedidoService.carregar($routeParams.id).then(function (pedido) { 
                $scope.pedido.datapedido = pedido.dataFormatada;
                $scope.pedido.vltotal = pedido.valorTotal;
                $scope.pedido.numeropedido = pedido.id;
    		
    		 var indexCliente = -1;
	         for(var i = 0, len = $scope.edicaoPedidoService.listaClientes.length; i < len; i++) {
	        	if ($scope.edicaoPedidoService.listaClientes[i].id === pedido.cliente.id) { 
	        		indexCliente = i;
	        	  break;
	        	}
	         }               	
             $scope.pedido.cliente = $scope.edicaoPedidoService.listaClientes[indexCliente];      
             
             for(var z = 0; z < pedido.lanches.length; z++){ 
            	 $scope.pedido.listaLanchesSelecionados.push(pedido.lanches[z]);
             }
             
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
        };
        
        function verificarLancheInserido(id){ 
        	var retorno = true;
        	for(var x = 0; x < $scope.pedido.listaLanchesSelecionados.length;x++){
        		if($scope.pedido.listaLanchesSelecionados[x].id == id){
        			retorno = false;
        			break;
        		}
        	}
        	return retorno;
        };
    	
    	$scope.adicionarLanche = function(idLanche){ debugger
    		if(!utilService.isNullOrUndefined(idLanche) &&
    				!utilService.isNullOrUndefined($scope.pedido.qtd)) {
    		if(verificarLancheInserido(idLanche) == true){
    			if(idLanche > 4) {
    				var lanche = $scope.pedido.lanche;
    				lanche.qtd = $scope.pedido.qtd;
    				 // com promoção
                    if(!utilService.isNullOrUndefined($scope.pedido.promocao)){
                 	   $scope.pedido.vltotal+= 
        	   				(lanche.valorTotal -
        		   			((lanche.valorTotal*$scope.pedido.promocao.desconto)/100))*$scope.pedido.qtd;
                 	   lanche.valorTotal = (lanche.valorTotal -
               		   			((lanche.valorTotal*$scope.pedido.promocao.desconto)/100));                    	   
                 	   $scope.pedido.listaLanchesSelecionados.push(lanche);
                    } else { 
                 	   // sem promoção
                 	   lanche.valorTotal = lanche.valorTotal;
                 	   $scope.pedido.listaLanchesSelecionados.push(lanche);
                 	   $scope.pedido.vltotal+=lanche.valorTotal*$scope.pedido.qtd; 
                    }
    			} else {
    				$http.get('/dw-lanches/rest/pedidos/lanche/'+idLanche).then(
    	                    function (response) {
    	                      $scope.edicaoPedidoService.erros = [];
    	                       var lanche = {}; 
    	                       lanche = response.data;
    	                       lanche.qtd = $scope.pedido.qtd;
    	                       // com promoção
    	                       if(!utilService.isNullOrUndefined($scope.pedido.promocao)){
    	                    	   $scope.pedido.vltotal+= 
    	           	   				(response.data.valorTotal -
    	           		   			((response.data.valorTotal*$scope.pedido.promocao.desconto)/100))*$scope.pedido.qtd;
    	                    	   lanche.valorTotal = (response.data.valorTotal -
    	                  		   			((response.data.valorTotal*$scope.pedido.promocao.desconto)/100));                    	   
    	                    	   $scope.pedido.listaLanchesSelecionados.push(lanche);
    	                       } else { 
    	                    	   // sem promoção
    	                    	   lanche.valorTotal = lanche.valorTotal;
    	                    	   $scope.pedido.listaLanchesSelecionados.push(lanche);
    	                    	   $scope.pedido.vltotal+=response.data.valorTotal*$scope.pedido.qtd; 
    	                       }
    	                    },
    	                    function (response) {
    	                            window.console.log(response);
    	                            window.alert(mensagens.erro_ao_consultar_valor_lanche);
    	                    }
    	                ); 
    			}
    			
    		
    		} else {
    			$scope.edicaoPedidoService.erros.push(mensagens.lanche_ja_adicionado);
    		}
    		} else {
    			$scope.edicaoPedidoService.erros.push(mensagens.aviso_adicionar_lanche); 
    		}
    	};
    	
    	$scope.limparLanche = function(){
    		$scope.pedido.lanche = {};
    	};
    	
    	$scope.removerLanche = function(index,valor,qtd){ 
    		$scope.pedido.listaLanchesSelecionados.splice(index,1);
            $scope.pedido.vltotal-=valor*qtd;
            $scope.pedido.vltotal.toFixed(2);
    	};

        $scope.salvar = function () { 
        	edicaoPedidoService.salvar($scope.pedido,$scope.alterando).then(function (resultado) {                
                $scope.edicaoPedidoService.erros = [];
                $scope.salvoComSucesso = true;
                setTimeout(function(){ 
                	window.location.href = "#/consultar";
                	}, 2000);
            }, function (erros) {
            	window.console.log(erros);
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
    
    /**ModalInstancePacienteCtrl
     * Controller da modal de seleção de paciente
     * */
    pedido.controller('ModalLancheCtrl',
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
    
    /**PersonalizadoService
     * factory/serviço de criação básica de um lanche com os respectivos ingredientes
     * */ 
    pedido.factory('PersonalizadoService', ['$http', 
    											'$q', 
    											'MensagensPedidoService', 
    											'ConversorDataService',
  											  	'UtilService',
    											function ($http, 
    													  $q, 
    													  mensagens,
    													  conversorData,
    	    											  utilService) {
        var personalizadoService = {
                listaIngredientes : [],
                listaIngredientesSelecionados : [],
                erros : []
        };
        
        function validar(personalizado, resultado) {
        	personalizadoService.erros = [];        	
            if(utilService.isNullOrUndefined(personalizado.nome)
            		|| personalizado.listaIngredientesSelecionados.length < 1
            		){
            	personalizadoService.erros.push(mensagens.criacao_lanche_nao_permitida);            	
            }
            if (personalizadoService.erros.length !== 0) {
                resultado.reject(personalizadoService.erros);
                return false;
            }
            return true;
        }
        
        function montarDados(personalizado) {  
        	var dados = {
        			lanche : {},
        			ingredientes : []
        	};
        	dados.lanche.nome = personalizado.nome;
        	dados.lanche.vltotal = personalizado.vltotal;
        	for(var i = 0; i < personalizado.listaIngredientesSelecionados.length; i++){
        		dados.ingredientes.push(personalizado.listaIngredientesSelecionados[i].id); 
        	}
            return dados;
        }

        function criar(personalizado, resultado) {   
        	if(validar(personalizado,resultado)){
            $http.post('/dw-lanches/rest/lanches/novo', montarDados(personalizado)).then(function (response) {
                resultado.resolve(response.data);
            }, function (response) {
            	window.console.log(response);
                window.alert(mensagens.erro_ao_criar_lanche);
                resultado.reject(response.data);
            });
            }
        };

        personalizadoService.salvar = function (personalizado) { 
            var resultado = $q.defer();
            if (validar(personalizado, resultado)) {
                criar(personalizado, resultado);
            }
            return resultado.promise;
        };
        
        personalizadoService.carregarComboIngredientes = function() {                  		
            $http.get('/dw-lanches/rest/ingredientes/todos').then(function (response) {            	
            	personalizadoService.listaIngredientes = response.data;            	
            }, function (response) {
            	window.console.log(response);
                window.alert(mensagens.erro_carregar_clientes);
            });            
        };  

        return personalizadoService;
    }]);

    /**PersonalizarLancheCtrl
     * Controller de criação do lanche personalizado que receberá a injeção de servicos
     * */ 
    pedido.controller('PersonalizarLancheCtrl', 
    											['$scope',
    											'$routeParams', 
    											'$timeout', 
    											'PersonalizadoService', 
    											'MensagensPedidoService',    											
    											'UtilService',
    											'$http',
    											'ConversorDataService',
                                                 function ($scope,
                                                		   $routeParams, 
                                                		   $timeout, 
                                                		   personalizadoService, 
                                                		   mensagens,
                                                		   utilService,
                                                		   $http,
                                                		   conversorData) {
    												
    	$scope.mensagens = mensagens;
    	$scope.personalizadoService = personalizadoService;
    	
    	$scope.carregarCombo = function(){
            $scope.personalizadoService.carregarComboIngredientes();
    	};
    	
    	$scope.inicializarAtributos = function(){
         	$scope.personalizado = {
                     vltotal : 0.00,
                     listaIngredientesSelecionados : [],
                     nome : null
                 };
         };
        
        $scope.inicializarAtributos();
        $scope.salvoComSucesso = false;
        $scope.carregarCombo();
        
        function verificarIngredienteInserido(id){ 
        	var retorno = true;
        	for(var x = 0; x < $scope.personalizado.listaIngredientesSelecionados.length;x++){
        		if($scope.personalizado.listaIngredientesSelecionados[x].id == id){
        			retorno = false;
        			break;
        		}
        	}
        	return retorno;
        };
    	
    	$scope.adicionarIngrediente = function(id){ 
    		if(!utilService.isNullOrUndefined(id) ||
    				!utilService.isNullOrUndefined($scope.personalizado.nome)) {
	    		if(verificarIngredienteInserido(id) == true){	
	    		$http.get('/dw-lanches/rest/ingredientes/carregar/'+id).then(
	                    function (response) { 
	                      $scope.personalizadoService.erros = [];
	                       var ingrediente = {}; 
	                       ingrediente = response.data;
	                       $scope.personalizado.vltotal+=ingrediente.valor;
	                       $scope.personalizado.listaIngredientesSelecionados.push(ingrediente);
	                    },
	                    function (response) {
	                            window.console.log(response);
	                            window.alert(mensagens.erro_ao_retornar_ingrediente);
	                    }
	                ); 
	    		} else {
	    			$scope.personalizadoService.erros.push(mensagens.ingrediente_ja_adicionado);
	    		}
    		} else {
    			$scope.personalizadoService.erros.push(mensagens.criacao_lanche_nao_permitida); 
    		}
    	};

        $scope.salvar = function () { 
        	personalizadoService.salvar($scope.personalizado).then(function (resultado) {                
                $scope.salvoComSucesso = true;
                setTimeout(function(){ 
                	window.location.href = "#/consultar";
                	}, 2000);
            }, function (erros) {
            	window.console.log(erros);
                $scope.salvoComSucesso = false;
            });
        };
        
        $scope.cancelar = function(){
        	$scope.inicializarAtributos();        	
            $scope.personalizadoService.erros = [],
            $scope.salvoComSucesso = false; 
            window.location.href = "#/consultar";
        };
        
    }]);

    
}());