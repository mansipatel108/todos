(function () {
    var moduleName = "todoRoutes";
    var app = angular.module(moduleName, ['ngRoute', 'ngResource']);
    // Routes ++++++++++++++++++++++++++++++++++++++++++++++++++++++
    app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                templateUrl: '/todos.html',
                controller: 'TodoController'
            })
                .when('/:id', {
                templateUrl: '/todoDetails.html',
                controller: 'TodoDetailController'
            });
        }]);
})(); // end of closure

//# sourceMappingURL=todoroutes.js.map
