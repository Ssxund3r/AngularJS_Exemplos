var app = angular.module('loja', ['ngRoute']);
//Config -> Use este método para registrar o trabalho que precisa ser executado no carregamento 

//When -> adiciona uma nova definicão de rota ao serviço $ route.

//otherwise -> Define a definição da rota que será usada na mudança de rota quando nenhuma outra

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { controller: "listController", templateUrl: "list.html" }) //listar
        .when("/edit/:name", { controller: "editController", templateUrl: "form.html" }) //editar
        .when("/new", { controller: "newController", templateUrl: "form.html" }) // novo
        .otherwise({ redirectTo: "/" });
});

//Registro de trabalho que deve ser realizado quando o injetor é feito carregando todos os módulos
app.run(function ($rootScope) {
    $rootScope.frutas = ['banana', 'melancia', 'pera'];
});

app.controller('listController', ['$scope', function ($scope) {

}]);

//$scope é o escopo da aplicação html
//$location redirecionamento entre rotas 
//$routeParams são os parametros repassador pela url
app.controller('editController', ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {
    $scope.title = 'Editar frutas'; //adicionando titulo a pagina
    $scope.fruta = $routeParams.name; //pegando o nome da fruta para editar 
    $scope.frutaIndex = $scope.frutas.indexOf($scope.fruta); //pegando a fruta dentro da lista

    $scope.salvar = function () {
        $scope.frutas[$scope.frutaIndex] = $scope.fruta; //pega o novo nome da fruta editada
        $location.path('/'); // volta paraa o index
    };

}]);

app.controller('newController', ['$scope', '$location', function ($scope, $location) {
    $scope.title = 'Nova Fruta';
    $scope.fruta = '';

    $scope.salvar = function () {
        $scope.frutas.push($scope.fruta); // Adiciona nova fruta
        $location.path('/'); // Volta para o index
    };
}]);