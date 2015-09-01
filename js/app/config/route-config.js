app.config(function($routeProvider) {

	$routeProvider
	
	.when("/lista-clientes", {
		templateUrl : "view/cliente-list.html",
		controller : "cadastroClientesCtrl",
		resolve : {
			clientes : function(clienteService) {
				return clienteService.listarClientes();
			},
			cliente : function(clienteService) {
				return clienteService.novoCliente();
			},
			estados : function(clienteService) {
				return clienteService.estados();
			}
		}
	})
	
	.when("/form-cliente", {
		templateUrl : "view/cliente-form.html",
		controller : "cadastroClientesCtrl",
		resolve : {
			clientes : function(clienteService) {
				return [];
			},
			cliente : function(clienteService) {
				return clienteService.novoCliente();
			},
			estados : function(clienteService) {
				return clienteService.estados();
			}
		}
	})

	.when("/form-cliente/:id", {
		templateUrl : "view/cliente-form.html",
		controller : "cadastroClientesCtrl",
		resolve : {
			clientes : function(clienteService) {
				return [];
			},
			cliente : function(clienteService, $route) {
				return clienteService.getCliente($route.current.params.id);
			},
			estados : function(clienteService) {
				return clienteService.estados();
			},
			message : function() {
				return "Cliente salvo";
			}
		}
	})
	
	.otherwise({
        redirectTo: '/lista-clientes'
      });
	
	;

});