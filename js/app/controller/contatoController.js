var app = angular.module('app',[]);

app.controller('contatoController', ['$scope','$http', function($scope, $http) {

	$scope.contato = criaContato();
	
	$scope.msg = "";
	
	$scope.msgok = false;
	
	$scope.msgnok = false;
	
	$scope.enviaEmail = function() {

		$http.post('http://rest-ws.elasticbeanstalk.com/enviarEmail', $scope.contato)
		.success(
			function(data) {
				$scope.msgok = true;
				$scope.msg = 'Email Enviado.'
			})
		.error(function() {
			$scope.msgnok = true;
			$scope.msg = 'Descuple não foi possivel enviar a mensagem, favor entrar em contato pelo email: educlemos@gmail.com'
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