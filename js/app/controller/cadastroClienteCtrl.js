app.controller('cadastroClientesCtrl', cadastroClientesCtrl);

function cadastroClientesCtrl($scope, $location, clienteService, cliente, clientes, estados) {
	$scope.cliente = cliente.data;
	$scope.clientes = clientes.data;
	$scope.estados = estados.data;
    
    console.log('iniciou o controller');
    	
	/*GRAVA CLIENTE*/
	$scope.gravaCliente = function() {		
		 clienteService.adicionarCliente($scope.cliente).success(function(data) {
			 $location.path("lista-clientes");
			 if (typeof $scope.cliente.id == 'undefined') {				 
				alertnotice("Cliente Incluido com Sucesso");
			 }else{
				 alertnotice("Cliente Alterado com Sucesso");
			 }
		}).error(function(data) {
			alerterro("Erro ao salvar cliente");			
		});
	}
	
    /*EXCLUI CLIENTE*/
	$scope.removerCliente = function(cliente) {
		clienteService.excluirCliente(cliente).success(function(data) {
			alertnotice("Cliente Excluido com Sucesso");
			var index = $scope.clientes.indexOf(cliente);
			$scope.clientes.splice(index, 1);
		}).error(function(data) {
			alerterro("Erro ao excluir cliente: " + data);						
		});
	}

	/*CONSULTA CEP*/
	$scope.onBlur = function($event, cep) {
		if (typeof cep != 'undefined') {		
			clienteService.consultaCep(cep).success(function(data) {
				
				console.log('data.erro ' + data.erro);
				
				 if (typeof data.erro == 'undefined') {				 
					 $scope.cliente.endereco = data;
				  	 document.getElementById("numero").focus();
				 } else {
					 alertwarning("Cep n&atilde;o localizado.");
				 }
								
			}).error(function(data) {
				alerterro("Erro ao consultar o Cep.");
			});
		}

	};

}
