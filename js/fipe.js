var app = angular.module("app", ['ui.select', 'ngSanitize']);

app.controller('ctrl', ['$scope', '$http', function ($scope, $http) {

	$scope.marcas = [];
	$scope.modelos = [];
	$scope.anoModelos = [];

	$scope.marca = {};
	$scope.modelo = {};
	$scope.anoModelo = {};
	$scope.dadosFipe = {};

	$http.get("http://fipeapi.appspot.com/api/1/carros/marcas.json").success(function (data) {
		$scope.marcas = data;
	});

	$scope.consultarVeiculos = function (marcaSelecionada) {

		$scope.marca = marcaSelecionada;
		$scope.dadosFipe = {
			marca: marcaSelecionada.name
		};
		$scope.veiculo = {};

		var url = "http://fipeapi.appspot.com/api/1/carros/veiculos/" + marcaSelecionada.id + ".json";

		$http.get(url).success(function (data) {
			$scope.modelos = data;
		});

	}

	$scope.consultarModelos = function (modeloSelecionado) {

		$scope.modelo = modeloSelecionado;
		$scope.dadosFipe = {
			marca: $scope.marca.name,
			veiculo: modeloSelecionado.name
		};
		$scope.veiculo = {
			marca: $scope.marca,
			modelo: modeloSelecionado,
			ano: ''
		};

		var url = "http://fipeapi.appspot.com/api/1/carros/veiculo/" + $scope.marca.id + "/" + modeloSelecionado.id + ".json";

		$http.get(url).success(function (data) {
			$scope.anoModelos = data;
		});

	}

	$scope.consultarPreco = function (anoModeloSelecionado) {

		$scope.anoModelo = anoModeloSelecionado;

		var url = "http://fipeapi.appspot.com/api/1/carros/veiculo/" + $scope.marca.id + "/" + $scope.modelo.id + "/" + anoModeloSelecionado.id + ".json";

		$http.get(url).success(function (data) {

			if (data.ano_modelo == '32000') data.ano_modelo = 'Zero KM';

			$scope.dadosFipe = data;

		});
	}

}]);