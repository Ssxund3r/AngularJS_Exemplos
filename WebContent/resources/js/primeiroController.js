var app = angular.module('loja', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { controller: "listController", templateUrl: "list.html" }) //listar
        .when("/edit/:name", { controller: "editController", templateUrl: "form.html" }) //editar
        .when("/new", { controller: "newController", templateUrl: "form.html" }) //novo
        .otherwise({ redirectTo: "/" });
});

app.run(function ($rootScope) {
    $rootScope.frutas = ['banana', 'melancia', 'pera'];
});

app.controller('listController', ['$scope', function ($scope) {

}]);

app.controller('editController', ['$scope', '$location', '$routeParams', '$route', '$rootScope',
    function ($scope, $location, $routeParams, $route, $rootScope) {
        $scope.title = 'Editar frutas';
        $scope.fruta = $routeParams.name;
        $scope.frutaIndex = $scope.frutas.indexOf($scope.fruta);

        $scope.salvar = function () {
            $scope.frutas[$scope.frutaIndex] = $scope.fruta;
            $location.path('/');
        };
}]);

app.controller('newController', ['$scope', '$location', '$routeParams', '$rootScope', '$route',
    function ($scope, $location, $routeParams, $rootScope, $route) {
        $scope.title = 'Nova Fruta';
        $scope.fruta = '';

        $scope.salvar = function () {
            $scope.frutas.push($scope.fruta);
            $location.path('/');
        };
}]);