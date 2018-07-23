var myModule = angular.module("jullianoApp", [/* No Dependency Injection */]);

myModule.controller("counterCtrl",['$scope','$timeout','$http', function($scope,$timeout,$http){
  
	$scope.counter = 100;
	$scope.questionNumber = '01';
	$scope.questionTitle = 'Escreva a função: \n class Solução'
	$scope.questionDescription = ['Escreva a função: \n class Solução', 'Crie uma calculadora com suas funções mais clássica']
	$scope.langues = [{name:'Java', code: 'java', versionI: '0'}, {name:'C++', code: 'cpp', versionI: '0'}, {name:'PHP', code: 'php', versionI: '0'}, {name:'Python 2', code: 'python2', versionI: '0'}, {name:'COBOL', code: 'cobol', versionI: '0'}]
	$scope.response = 'Você precisa clicar em "Enviar" para obter um retorno';
	$scope.langue = null;
	$scope.chamar = chamar;
	$scope.disableOverlay = disableOverlay;
	$scope.myTextarea = '';
	$scope.block = false;

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
	   

	var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Headers", "Content-Type");

	

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
		    "clientSecret":"88ee4f1ca0226d4ce717550904438c259793fefb40e54998f1b9c99e1afb31be" 
			}
		}
		
		console.log(editor.getValue())
		$http(req).then(function(response){
			if(response.data.output == ''){
				$scope.response = 'Retorno = null'
			} else {
				$scope.response = response.data.output
			}
		}, function(response){
			console.log(response)
			$scope.response = response.data.output
		});
	}



 }]);