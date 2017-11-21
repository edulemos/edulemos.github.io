'use strict';

var map = null;

var inicial = {
	latitude: -22.903839,
	longitude: -43.215111
};

var mapDiv = document.getElementById("map_canvas");

var opcoes = {
	center: new google.maps.LatLng(inicial.latitude, inicial.longitude),
	zoom: 12,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};

var infoWindow = new google.maps.InfoWindow({
	content: ""
});

function inicializarMapa() {
	map = new google.maps.Map(mapDiv, opcoes);
}

var imagens = {
	onibus: 'img/bus.png',
	localAtual: 'img/local.png'
};

var marcadores = [];

var criaMarcador = function (marcador, mapa) {

	var posicao = new google.maps.LatLng(marcador.latitude, marcador.longitude);

	var opcoes = {
		position: posicao,
		title: marcador.titulo,
		animation: google.maps.Animation.DROP,
		icon: {
			url: marcador.imagem
		},
		map: mapa
	};

	var novoMarcador = new google.maps.Marker(opcoes);
	marcadores.push(novoMarcador);
	map.setCenter(novoMarcador.position)

	novoMarcador.addListener('click', function () {

		var titulo = marcador.titulo;
		var adress = "";

		var xmlhttp = new XMLHttpRequest();
		var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + marcador.latitude + "," + marcador.longitude + "&sensor=true";
		var retorno = "";

		xmlhttp.onreadystatechange = function () {

			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var response = JSON.parse(xmlhttp.responseText);
				openAlert(response);
			}


		};

		xmlhttp.open("GET", url, true);
		xmlhttp.send();

		function openAlert(response) {

			adress = response.results[0].formatted_address;

			if (marcador.imagem == imagens.onibus) {

				var dataHoraTratada = marcador.dataHora
				msg = "Linha: " + marcador.linha + "<br>" + 
					  "Carro: " + marcador.ordem + "<br>" + 
					  "Posi&ccedil;&atilde;o em " +					
					 tratarDataHora(marcador.dataHora) + "<br>" + adress.split(',')[0] + ", " + adress.split(',')[1];

			} else {

				msg = "Voc&ecirc; est&aacute; aqui!" + "<br>" + adress.split(',')[0] + ", " + adress.split(',')[1];

			}

			infoWindow.setContent(msg);
			infoWindow.open(map, novoMarcador, msg);

		}

		map.setCenter(novoMarcador.getPosition());

	});

}

function tratarDataHora(dataHora) {
	try {

		//formato original--> 05-25-2016 10:17:39
		var mes = dataHora.split('-')[0];
		var dia = dataHora.split('-')[1];
		var ano = dataHora.split('-')[2];
		var dataHoraFormatada = dia + '/' + mes + '/' + ano.substring(0, 10);;

		//formato saida--> 25/05/2016 10:17
		return dataHoraFormatada;

	} catch (erro) {
		console.log(erro);
		return dataHora;
	}

}

function localizarUsuario() {

	if (window.navigator && window.navigator.geolocation) {

		var geolocation = window.navigator.geolocation;
		geolocation.getCurrentPosition(sucesso, erro);

	} else {

		console.log('Geolocalização não suportada em seu navegador.');

	}

	function sucesso(posicao) {

		var latitude = posicao.coords.latitude;
		var longitude = posicao.coords.longitude;

		var marcador = {
			titulo: 'Seu local \n',
			imagem: imagens.localAtual,
			latitude: posicao.coords.latitude,
			longitude: posicao.coords.longitude
		}

		criaMarcador(marcador, map);

	}

	function erro(error) {
		console.log(error);
	}

}

function centralizarMapaMarcadores(somaLatitude, somaLongitude, resultSize) {

	var latitudeCentralizada = somaLatitude / resultSize;
	var longitudeCentralizada = somaLongitude / resultSize;

	var posicaoMarcadores = new google.maps.LatLng(latitudeCentralizada, longitudeCentralizada);

	map.setCenter(posicaoMarcadores);

}

inicializarMapa();

function consultar() {

	var xmlhttp = new XMLHttpRequest();
	var linha = document.getElementById("numeroLinha").value;
	var url = "http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/onibus/" + linha;
	var retorno = "";

	xmlhttp.onreadystatechange = function () {
		switch (xmlhttp.readyState) {
		case 4:
			{
				if (xmlhttp.status === 200) {

					var response = JSON.parse(xmlhttp.responseText);
					trataRetorno(response);
				}
				break;
			}
		case 3:
			{
				inicializarMapa();
				document.getElementById("msg").innerHTML = "<b>N&Atilde;O FORAM ENCONTRADOS DADOS</b>";
				break;
			}
		}
	};


	xmlhttp.open("GET", url, true);
	xmlhttp.send();

}

function trataRetorno(response) {

	var dataArray = response.DATA;
	var somaLatitude = 0;
	var somaLongitude = 0;
	var numCarros = dataArray.length;


	for (var i = 0; i < numCarros; i++) {

		var subArray = dataArray[i];

		var dataHora = subArray[0];
		var ordem = subArray[1];
		var linha = subArray[2];
		var latitude = subArray[3];
		var longitude = subArray[4];
		var velocidade = subArray[5];
		var direcao = subArray[6];

		somaLatitude += latitude;
		somaLongitude += longitude;

		var marcador = {
			imagem: imagens.onibus,
			longitude: longitude,
			latitude: latitude,
			linha: linha,
			ordem: ordem,
			velocidade: velocidade,
			dataHora: dataHora,
			titulo: 'Linha: ' + linha + '\n' +
				'Carro: ' + ordem + '\n' +
				'Velocidade: ' + velocidade + 'km/h' + '\n' +
				'Em: ' + tratarDataHora(dataHora) + '\n'
		};

		var carro = {
			ordemCarro: ordem,
			localizacaoCarro: '',
			dataHoraCarro: dataHora
		};

		criaMarcador(marcador, map);

	}

	if (numCarros > 0) {
		document.getElementById("msg").innerHTML = "<b>FORAM LOCALIZADOS " + numCarros + " &Ocirc;NIBUS</b>";
	}


	centralizarMapaMarcadores(somaLatitude, somaLongitude, numCarros);
    
    localizarUsuario();


}