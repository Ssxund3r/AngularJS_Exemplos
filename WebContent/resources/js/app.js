// configura��o do m�dulo
var app = angular.module('loja', ['ngRoute', 'ngResource', 'ngAnimate']);

// configurando rotas
app.config(function ($routeProvider) {

	$routeProvider.when("/clientelist", {
		controller: "clienteController",
		templateUrl: "cliente/list.html"
	})// listar

		.when("/clienteedit/:id", {
			controller: "clienteController",
			templateUrl: "cliente/cadastro.html"
		})// editar

		.when("/cliente/cadastro", {
			controller: "clienteController",
			templateUrl: "cliente/cadastro.html"
		})

		// novo
		.otherwise({
			redirectTo: "/"
		});
});

app.controller('clienteController', function ($scope, $http, $location, $routeParams) {
	
	if($routeParams.id != null && $routeParams.id != undefined
			&& $routeParams.id != '') {
		//entra para editar
		$http.get("cliente/buscarCliente/" + $routeParams.id).then(function(response) {
			$scope.cliente = response;
		}).catch(function(error, reason, reasonLocal) {
		    alert("Erro: " + error + ", Motivo: " + reason);
		    console.log("Motivo local: ", reasonLocal);
		  });		
	} else {
		$scope.cliente={};
	}
	
	$scope.editarCliente = function(id) {
		$location.path('clienteedit/' + id);
	};
	
	$scope.salvarCliente = function name(){
		$http.post("cliente/salvar", $scope.cliente).then(function(response) {
			$scope.cliente={};
			$scope.salvarCliente = response.data;
		}).catch(function (error) {
			alert("Error" + error);
		});
	};
	
	$scope.listarClientes = function () {
		$http.get("cliente/listar").then(function (response) {
			$scope.data = response.data;
		}).catch(function (error) {
			alert("Error" + error);
		});
	};
	
	// remover cliente passado como parametro
	$scope.removerCliente = function(codCliente) {
		$http.delete("cliente/deletar/" + codCliente).then(function(response) {
			$scope.listarClientes();
		}).catch(function(error, reason, reasonLocal) {
		    alert("Erro: " + error + ", Motivo: " + reason);
		    console.log("Motivo local: ", reasonLocal);
		  });
	};

});