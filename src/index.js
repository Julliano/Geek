var myModule = angular.module("jullianoApp", [/* No Dependency Injection */]);

myModule.controller("counterCtrl",['$scope','$timeout','$http', function($scope,$timeout,$http){
  
	$scope.counter = 100;
	$scope.question = [{number: '01', questionTitle: 'Escreva a função: \n class Solução', questionDescription: ['Escreva a função: \n class Solução', 'Crie uma calculadora com suas funções mais clássica']}]
	$scope.langues = [{name:'Java', code: 'java', versionI: '0'}, {name:'C++', code: 'cpp', versionI: '0'}, {name:'PHP', code: 'php', versionI: '0'}, {name:'Python 2', code: 'python2', versionI: '0'}, {name:'COBOL', code: 'cobol', versionI: '0'}]
	$scope.response = 'Você precisa clicar em "Enviar" ou "Testar Script" para obter um retorno';
	$scope.langue = null;
	$scope.chamar = chamar;
	$scope.disableOverlay = disableOverlay;
	$scope.responseValid = responseValid;
	$scope.corCounter = corCounter;
	$scope.myTextarea = '';
	$scope.block = false;
	$scope.compilado = false;
	$scope.compilando = false;

	countdown()

	function disableOverlay(){
		$scope.block = false;
		location.reload();
	}

	function countdown() {
	    stopped = $timeout(function() {
	     if ($scope.counter == 0){
	     	$scope.block = true;
	     	return
	     }  
	     $scope.counter--;
	     countdown()
	    }, 1000);
	  };
	   

	function corCounter(){
		if($scope.counter > 20){
			return 'blueCounter'
		} else {
			return 'redCounter'
		}
	}

	var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Headers", "Content-Type");

	function responseValid(){
		if($scope.compilado == true){
			return 'returnValid';
		} else {
			return '';
		}
	}

	function chamar(){
		var req = {
		 method: 'POST',
		 headers: headers,
		 url: 'https://api.jdoodle.com/execute',
		 data: { 
		 	"script" : editor.getValue(),
		    "language": $scope.langue.code,
		    "versionIndex": $scope.langue.versionI,
		    "clientId": "26f2bd09f853c0a5411e0b67c2dbf72",
		    "clientSecret":"dc530672fa253fbaf075a6bdd62ac7cce35e42a5367e7b729812fea83513d739" 
			}
		}

		$scope.compilando = true;
		
		$http(req).then(function(response){
			if(response.data.output == ''){
				$scope.response = 'Retorno = null'
				$scope.compilado = true;
				$scope.compilando = false;
			} else {
				$scope.response = response.data.output
				$scope.compilado = true;
				$scope.compilando = false;
			}
		}, function(response){
			console.log(response)
			$scope.response = response.data.output
		});
	}



 }]);