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
    													 'dextra.directives',
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
    agendamento.controller('PesquisarAgendamentoCtrl', ['$scope',
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
        
        $scope.mensagens = mensagens;
        $scope.datepickersAbertos = {
                data : false
         };   
        $scope.pesquisaPedidoService.carregarComboClientes();
        $scope.pesquisaPedidoService.carregarComboLanches();
        
    }]);

    /**PesquisaPedidoService
     * factory/serviço de pesquisa de pedidos
     * */ 
    agendamento.factory('PesquisaPedidoService', 
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
            if (pesquisaAgendamentoService.filtros.cliente) {
            	params.cliente = pesquisaPedidoService.filtros.cliente.id;
            }
            if (pesquisaAgendamentoService.filtros.numeropedido) {
            	params.pedido = pesquisaPedidoService.filtros.numeropedido;
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
                    $http.delete('/dw-lanches/rest/pedido/excluir/' + codigo).then(function (response) {
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
                    		(pesquisaAgendamentoService.resultadoPesquisa.length === 0);            			
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
    agendamento.factory('EdicaoPedidoService', ['$http', 
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
                erros : []
        };
        
        function validar(agendamento, resultado) {
            
        	edicaoAgendamentoService.erros = [];
        	
            if(utilService.isNullOrUndefined(agendamento.paciente)){
            	edicaoAgendamentoService.erros.push(mensagens.informe_o_nome_do_paciente);            	
            }
            if(!utilService.isNullOrUndefined(agendamento.paciente)){
	            if (agendamento.toString().length < 4){
	            	edicaoAgendamentoService.erros.push(mensagens.digite_ao_menos_4_caracteres);
	        	}
            }            
            if(utilService.isNullOrUndefined(agendamento.dataatendimento)){
            	edicaoAgendamentoService.erros.push(mensagens.informe_a_data_atendimento);
            }
            if(utilService.isNullOrUndefined(agendamento.datacadastro)){
            	edicaoAgendamentoService.erros.push(mensagens.informe_a_data_cadastro);
            } 
            if(utilService.isNullOrUndefined(agendamento.horaatendimento)){
            	edicaoAgendamentoService.erros.push(mensagens.informe_a_hora_atendimento);
            } 
            if(conversorData.horaInvalida(agendamento.horaatendimento)){
            	edicaoAgendamentoService.erros.push(mensagens.horario_invalido);
            }            
            if(!utilService.isNullOrUndefined(agendamento.datacadastro)
            		&& !utilService.isNullOrUndefined(agendamento.dataatendimento)){
		            if(agendamento.dataatendimento < 
		            		agendamento.datacadastro){
		            	edicaoAgendamentoService.erros.push(mensagens.data_cadastro_maior_data_atendimento);
		            }
            } 
            if(utilService.isNullOrUndefined(agendamento.medico)){
            	edicaoAgendamentoService.erros.push(mensagens.informe_o_medico);
            }
            
            if(utilService.isNullOrUndefined(agendamento.convenio)){
            	edicaoAgendamentoService.erros.push(mensagens.informe_o_convenio);
            }
            
            if(utilService.isNullOrUndefined(agendamento.postocoleta)){
            	edicaoAgendamentoService.erros.push(mensagens.informe_o_posto_coleta);
            }
          
            if (edicaoAgendamentoService.erros.length !== 0) {
                resultado.reject(edicaoAgendamentoService.erros);
                return false;
            }
            return true;
        }
        
        function montarDados(agendamento) { 
        	var dados = {};
        	dados.codigo_paciente = edicaoAgendamentoService.codigo_paciente;
        	if(agendamento.dataatendimento instanceof Date === true){
        		dados.dataatendimento = conversorData.string(agendamento.dataatendimento);
        	} else {
        		dados.dataatendimento = moment(agendamento.dataatendimento).format('DD/MM/YYYY');
        	}
        	if(agendamento.datacadastro instanceof Date === true) {
        		dados.datacadastro = conversorData.string(agendamento.datacadastro);	
        	} else {
        		dados.datacadastro = moment(agendamento.datacadastro).format('DD/MM/YYYY');
        	}        	       	
        	dados.horaatendimento = agendamento.horaatendimento;
        	dados.codigo_medico = agendamento.medico.codigo;
        	dados.codigo_convenio = agendamento.convenio.codigo;
        	dados.codigo_postocoleta = agendamento.postocoleta.codigo;
          
            if (edicaoAgendamentoService.erros.length !== 0) {
                resultado.reject(edicaoAgendamentoService.erros);
                return dados;
            }
            return dados;
        }

        function atualizar(agendamento, resultado) { 
            $http.put('/shift-app/rest/agendamentos/alterar/' + agendamento.codigo, montarDados(agendamento)).then(function (response) {
                resultado.resolve(agendamento);
            }, function (response) {
            	alert("Houve algum problema!");
                resultado.reject(response.data);
            });
        }

        function criar(agendamento, resultado) {        	
            $http.post('/shift-app/rest/agendamentos/novo', montarDados(agendamento)).then(function (response) {
                resultado.resolve(response.data);
            }, function (response) {
            	if(response.status == 500){
            		alert("Houve algum problema interno!");
            	}
                resultado.reject(response.data);
            });
        }

        edicaoAgendamentoService.carregar = function (codigo) { 
            var resultado = $q.defer();
            $http.get('/shift-app/rest/agendamentos/codigo/' + codigo).then(function (response) {
                resultado.resolve(response.data);
            }, function (response) {
            	alert("Houve algum problema!");
                resultado.reject(response.data);
            });
            return resultado.promise;
        };
       
        edicaoAgendamentoService.salvar = function (agendamento,alterando) { 
            var resultado = $q.defer();
            if (validar(agendamento, resultado)) {
                if (alterando === true) {
                    atualizar(agendamento, resultado);
                } else {                	
                    criar(agendamento, resultado);
                }
                pesquisaAgendamentoService.resultadoPesquisa = [];
            }
            return resultado.promise;
        };
        
        edicaoAgendamentoService.carregarComboMedicos = function() {                  		
            $http.get('/shift-app/rest/medicos/todos').then(function (response) {            	
            	edicaoAgendamentoService.listaMedicos = response.data;            	
            }, function (response) {
            	if (response.status === 400 && response.data.erros) {
            		edicaoAgendamentoService.erros = response.data.erros;
                } else {
                    window.console.log(response);
                    window.alert(mensagens.erro_carregar_medicos_especialidades);
                }
            });            
        };  
        
        edicaoAgendamentoService.carregarComboConvenios = function() {                  		
            $http.get('/shift-app/rest/convenios/todos').then(function (response) {            	
            	edicaoAgendamentoService.listaConvenios = response.data;            	
            }, function (response) {            	
                    window.console.log(response);
                    window.alert(mensagens.erro_carregar_convenios);               
            });            
        }; 
        
        edicaoAgendamentoService.carregarComboPostosColeta = function() {                  		
            $http.get('/shift-app/rest/postoscoleta/todos').then(function (response) {            	
            	edicaoAgendamentoService.listaPostosColeta = response.data;            	
            }, function (response) {            	
                    window.console.log(response);
                    window.alert(mensagens.erro_carregar_postos_coleta);
            });            
        }; 

        return edicaoAgendamentoService;
    }]);

    /**EditarAgendamentoCtrl
     * Controller de edição de agendamentos que receberá a injeção de servicos
     * */ 
    agendamento.controller('EditarAgendamentoCtrl', 
    											['$scope',
    											'$routeParams', 
    											'$timeout', 
    											'EdicaoAgendamentoService', 
    											'MensagensAgendamentoService',    											
    											'$uibModal',
    											'UtilService',
    											'$http',
    											'ConversorDataService',
    											'$filter',
    											'PesquisaAgendamentoService',    											
                                                 function ($scope,
                                                		   $routeParams, 
                                                		   $timeout, 
                                                		   edicaoAgendamentoService, 
                                                		   mensagens,
                                                		   $uibModal,
                                                		   utilService,
                                                		   $http,
                                                		   conversorData,
                                                		   $filter,
                                                		   pesquisaAgendamentoService) {
    												
        $scope.pesquisaAgendamentoService = pesquisaAgendamentoService;
    	$scope.mensagens = mensagens;
    	$scope.edicaoAgendamentoService = edicaoAgendamentoService;
    	$scope.filtros = {
    			nome : null,
    			datanascimento : null,
    			erros : [],
    			resultadoPesquisa : [],
    			nenhumRegistroEncontrado : false
    	};
    	$scope.gravacaoNaoPermitida = false;
    	   	
        function validarFiltrosPacientes(){ 
        	var resultado = true;
        	$scope.filtros.erros = [];
            
            if(utilService.isNullOrUndefined($scope.filtros.nome)){
            	resultado = false;
            	$scope.filtros.erros.push(mensagens.informe_o_nome_do_paciente);            	
            }
            if(!utilService.isNullOrUndefined($scope.filtros.nome)){
	            if ($scope.filtros.nome.toString().length < 4){
	        		resultado = false;
	        		$scope.filtros.erros.push(mensagens.digite_ao_menos_4_caracteres);
	        	}
            } 
            return resultado;
        };
        
        function montarFiltrosPesquisaPacientes() { 
            var params = {};
            
            if(!utilService.isNullOrUndefined($scope.filtros.nome)){
            	params.nome = $scope.filtros.nome;
            }            
            
            if (!utilService.isNullOrUndefined($scope.filtros.datanascimento)) {
            	var d1 = $scope.filtros.datanascimento;
            	params.datanascimento = conversorData.string(d1);
            }
            return params;
        };
        
        $scope.pesquisarPacientes = function () { 
        	var params = {};
        	$scope.filtros.resultadoPesquisa = [];
            if (validarFiltrosPacientes()) {               
                $http.get('/shift-app/rest/pacientes/consulta/',{params : montarFiltrosPesquisaPacientes()}).then(
                    function (response) {
                    	$scope.filtros.resultadoPesquisa = response.data;
                    	$scope.filtros.nenhumRegistroEncontrado = ($scope.filtros.resultadoPesquisa.length === 0);            			
                    },
                    function (response) {
                            window.console.log(response);
                            window.alert(mensagens.erro_ao_pesquisar);
                    }
                );
            }
        };
    	
        $scope.limparPacientes = function () {
        	$scope.filtros.nome = null;
        	$scope.filtros.datanascimento = null;
        	$scope.filtros.erros = [];
        	$scope.filtros.resultadoPesquisa = [];
        	$scope.filtros.nenhumRegistroEncontrado = false;
        	$scope.edicaoAgendamentoService.codigo_paciente = null;
        	$scope.pesquisaAgendamentoService.excluiu = false;
        };
        
        $scope.selecionarPaciente = function (codigo,nome){ 
        	edicaoAgendamentoService.codigo_paciente = codigo;
        	$scope.agendamento.paciente = nome;
        };
        
        $scope.cancelarSelecaoPaciente = function (){ 
        	edicaoAgendamentoService.codigo_paciente = null;
        	$scope.agendamento.paciente = null;
        };
    	    
    	$scope.datepickersAbertos = {
                 cadastro : false,
                 atendimento : false,
                 atendimenotDN : false
         }; 
    	
    	$scope.carregarCombos = function(){
            $scope.edicaoAgendamentoService.carregarComboMedicos();
            $scope.edicaoAgendamentoService.carregarComboPostosColeta();
            $scope.edicaoAgendamentoService.carregarComboConvenios();
    	};
    	
    	 $scope.inicializarAtributos = function(){
         	$scope.agendamento = {
                     codigo_paciente : null,
                 	 datacadastro : null,
                     dataatendimento : null,
                     medico : null,
                     convenio : null,
                     postocoleta : null,
                     horaatendimento : null,
                     pacienteConsulta : null,
                     pacienteDNConsulta : null
                 };
         };

    	if ($routeParams.id) { 
    		$scope.inicializarAtributos();
    		$scope.carregarCombos();
    		edicaoAgendamentoService.carregar($routeParams.id).then(function (agendamento) { 
                $scope.agendamento.dataatendimento = agendamento[0].dataatendimento;
    			$scope.agendamento.datacadastro = agendamento[0].datacadastro;
    			$scope.agendamento.horaatendimento = agendamento[0].horaatendimento.substring(0,5); 
    		
    		 var indexConvenio = -1;
	         for(var i = 0, len = $scope.edicaoAgendamentoService.listaConvenios.length; i < len; i++) {
	        	if ($scope.edicaoAgendamentoService.listaConvenios[i].convenio === agendamento[0].convenio) {
	        	  indexConvenio = i;
	        	  break;
	        	}
	         }               	
             $scope.agendamento.convenio = $scope.edicaoAgendamentoService.listaConvenios[indexConvenio]; 
             
             var indexMedico = -1;
	         for(var i = 0, len = $scope.edicaoAgendamentoService.listaMedicos.length; i < len; i++) {
	        	if ($scope.edicaoAgendamentoService.listaMedicos[i].medicoespecialidade === agendamento[0].medicoespecialidade) {
	        	  indexMedico = i;
	        	  break;
	        	}
	         }               	
             $scope.agendamento.medico = $scope.edicaoAgendamentoService.listaMedicos[indexMedico]; 
             
             var indexPostoColeta = -1;
	         for(var i = 0, len = $scope.edicaoAgendamentoService.listaPostosColeta.length; i < len; i++) {
	        	if ($scope.edicaoAgendamentoService.listaPostosColeta[i].postocoleta === agendamento[0].postocoleta) {
	        	  indexPostoColeta = i;
	        	  break;
	        	}
	         }               	
             $scope.agendamento.postocoleta = $scope.edicaoAgendamentoService.listaPostosColeta[indexPostoColeta]; 
             $scope.agendamento.codigo_paciente = agendamento[0].codigo_paciente;
             $scope.agendamento.codigo = agendamento[0].codigo;
             $scope.agendamento.paciente = agendamento[0].paciente;
             $scope.edicaoAgendamentoService.codigo_paciente = agendamento[0].codigo_paciente;
    			   			
             $scope.alterando = true;
             
            }, function (erros) {
                $scope.edicaoAgendamentoService.erros = erros;
            });
        } else {
        	$scope.inicializarAtributos();
            $scope.edicaoAgendamentoService.erros = [];
            $scope.salvoComSucesso = false;
            $scope.alterando = false;
            $scope.carregarCombos();
        }

        $scope.salvar = function () { 
        	if (utilService.isNullOrUndefined(edicaoAgendamentoService.codigo_paciente)){
        		$scope.gravacaoNaoPermitida = true;
            	edicaoAgendamentoService.erros.push(mensagens.gravacao_nao_permitida);
        		return;
        	}
        	
        edicaoAgendamentoService.salvar($scope.agendamento,$scope.alterando).then(function (resultado) {                
                $scope.edicaoAgendamentoService.erros = [];
                $scope.salvoComSucesso = true;
                setTimeout(function(){ 
                	window.location.href = "#/consultar";
                	}, 2000);
            }, function (erros) {
                $scope.edicaoAgendamentoService.erros = erros;
                $scope.salvoComSucesso = false;
            });
        };
        
        $scope.cancelar = function(){
        	$scope.inicializarAtributos();        	
            $scope.edicaoAgendamentoService.erros = [],
            $scope.pesquisaAgendamentoService.excluiu = false;
            $scope.salvoComSucesso = false; 
            $scope.alterando = false;
            
            window.location.href = "#/consultar";
        };
        
        $scope.abrirModalPaciente = function(agendamento){   
        	$scope.gravacaoNaoPermitida = false;        	
        	    var modalInstance = $uibModal.open({
        	        templateUrl: '/shift-app/agendamento/html/modal-paciente.html',
        	        controller: 'ModalInstancePacienteCtrl',
        	        controllerAs : '$ctrl',
        	        size: 'lg',
        	        scope: $scope,
        	        bindToController: true,
        	        resolve: {
        	            agendamento: function () {
        	              return agendamento;
        	            }
        	        }
        	    	}).result.then(function(result) { 
        			});         	        
        };       
    }]);
    
    /**Factory de Mensagens
     * factory/serviço que realiza o carregamento de mensagens no formato JSON
     * */ 
    agendamento.factory('MensagensAgendamentoService', ['$http', function($http) {
        var mensagens = {};
    	$http.get('/shift-app/agendamento/mensagens.json').then(function (response) {
    		angular.copy(response.data, mensagens);
    	});    	
    	return mensagens;
    }]);
    
    /**ModalInstancePacienteCtrl
     * Controller da modal de seleção de paciente
     * */
    agendamento.controller('ModalInstancePacienteCtrl',
											['$uibModalInstance','$scope',
								            function ($uibModalInstance,$scope) { 
    	  var $ctrl = this;   	  
    	  $ctrl.ok = function () {    		
    	    $uibModalInstance.close(true);
    	  };

    	  $ctrl.cancelar = function () {
    		  
    		$scope.$parent.cancelarSelecaoPaciente();
    	    $uibModalInstance.dismiss('cancel');
    	  };
    
	}]);
    
    /**ModalInstanceConfirmacaoCtrl
     * Controller da modal de confirmação de exclusão
     * */
    agendamento.controller('ModalInstanceConfirmacaoCtrl',
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
    
    agendamento.factory('LoginService', [ '$http', 
										  '$q',
										   function ($http, 
													 $q) {
    		var loginService = {
						teste : null
			};
			
			return loginService;
    }]);
    
    /**Login
     * Controller do login da aplicação
     * */
    agendamento.controller('LoginCtrl',['$scope',"$http","$q",'LoginService','SessionStorageService','$window',
								         function ($scope,$http,$q,loginService,sessionStorageService,$window) { 
			$scope.login = function(user,pass) {   			
				$scope.dadosLogin = {
							user : null,
							pass : null
				};
				$scope.dadosLogin.user = user;
				$scope.dadosLogin.pass = pass;
				sessionStorageService.saveUserSession($window,$scope.dadosLogin);				
			};
    
	}]); 
    
}());
