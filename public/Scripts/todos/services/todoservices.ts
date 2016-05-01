(function() {
var app = angular.module('todoServices', ['ngRoute', 'ngResource', 'todoRoutes']);

// Todos Service +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    app.factory('Todos', ['$resource', ($resource) => {
        return $resource('/todos/:id', null, {
            'update': { method: 'PUT' }
        });
    }]);
})(); // end of closure