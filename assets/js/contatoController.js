var app = angular.module('app',[]);

app.controller('contatoController', ['$scope','$http', function($scope, $http) {

	$scope.contato = criaContato();

	$scope.enviaEmail = function() {

		$http.get('http://rest-ws.elasticbeanstalk.com/enviarEmail'+$scope.contato)
		.success(
			function(data) {
				alert('Email Enviado.');
			})
		.error(function() {
			alert('não foi possivel enviar o email');
		})
	}
	
}]);

function criaContato(){
	return {
		nome: "",
		email: "",
		assunto: "",
		texto: ""
	}
}