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

app.controller('clienteController', function($scope, $http) {
	  $scope.listarClientes = function() {
	    $http.get("cliente/listar").success(function(response) {
	      $scope.data = response.data;
	    }).catch(function(error) {
	      alert("Error" + error);
	    });
	  };
	});