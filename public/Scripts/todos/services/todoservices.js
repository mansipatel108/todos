(function () {
    var app = angular.module('todoServices', ['ngRoute', 'ngResource', 'todoRoutes']);
    // Todos Service +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    app.factory('Todos', ['$resource', function ($resource) {
            return $resource('/todos/:id', null, {
                'update': { method: 'PUT' }
            });
        }]);
})(); // end of closure

//# sourceMappingURL=todoservices.js.map
