app.factory("clienteService",function($http, config){
	
	var _listarClientes = function(){
		return $http.get(config.baseUrl + "/listarClientes");
	};
	
	var _getCliente = function (id) {
		return $http.get(config.baseUrl + "/getCliente/" + id);
	};
	
	var _adicionarCliente = function (cliente) {
		return $http.post(config.baseUrl + "/adicionarCliente", cliente);
	};
	
	var _excluirCliente = function (cliente) {
		return $http.post(config.baseUrl + "/removerCliente", cliente);
	};
	
	var _estados = function () {
		return $http.get("json/estados.json");
	};
	
	var _consultaCep = function (cep) {
		return $http.get("https://viacep.com.br/ws/"+cep+"/json/");
	};
	
	var _novoCliente = function () {
		return {			
		}
	};
	
	return{
		listarClientes: _listarClientes,
		getCliente: _getCliente,
		novoCliente: _novoCliente,
		adicionarCliente: _adicionarCliente,
		excluirCliente: _excluirCliente,
		consultaCep: _consultaCep,
		estados: _estados
	}
	
});

