// configura��o do m�dulo
var app = angular.module('loja', ['ngRoute', 'ngResource', 'ngAnimate']);

// configurando rotas
app.config(function ($routeProvider) {

	$routeProvider.when("/clientelist", {
		controller: "clienteController",
		templateUrl: "cliente/list.html"
	})// listar cadastro

		.when("/clienteedit/:id", {
			controller: "clienteController",
			templateUrl: "cliente/cadastro.html"
		})// editar cadastro

		.when("/cliente/cadastro", {
			controller: "clienteController",
			templateUrl: "cliente/cadastro.html"
		})// novo cadastro

		// novo
		.otherwise({
			redirectTo: "/"
		});
});

app.controller('clienteController', function ($scope, $http, $location, $routeParams) {
	
	if($routeParams.id != null && $routeParams.id != undefined
			&& $routeParams.id != '') {
		//entra para editar
		$http.get("cliente/buscarcliente/" + $routeParams.id).then(function(response) {
			$scope.cliente = response.data;
		}).catch(function(error) {
			alert("Error: " + error);
		});		
	} else {
		$scope.cliente = {};
	}
	
	$scope.editarCliente = function(id) {
		$location.path('clienteedit/' + id);
	};
	
	$scope.salvarCliente = function name(){
		$http.post("cliente/salvar", $scope.cliente).then(function(response) {
			$scope.cliente={};
			$scope.salvarCliente = response.data;
			sucesso("Operação Realizada Com Sucesso!");
		}).catch(function (error) {
			erro("Error" + error);
		});
	};
	
	$scope.listarClientes = function () {
		$http.get("cliente/listar/").then(function (response) {
			$scope.data = response.data;
		}).catch(function (error) {
			erro("Error: " + error);
		});
	};
	
	// remover cliente passado como parametro
	$scope.removerCliente = function(codCliente) {
		$http.delete("cliente/deletar/" + codCliente).then(function(response) {
			$scope.listarClientes();
			sucesso("Operação Realizada Com Sucesso!");
		}).catch(function(error, reason, reasonLocal) {
		    erro("Erro: " + error + ", Motivo: " + reason);
		    console.log("Motivo local: ", reasonLocal);
		  });
	};
	
});

function sucesso(msg) {
    $.notify({
  	  message: msg
    },{
  	  type:'success',
  	  timer: 1000
    });
}

function erro(msg) {
    $.notify({
  	  message: msg
    },{
  	  type:'danger',
  	  timer: 1000
    });
}