(function() {
    'use strict';

    angular
        .module('app.global')
        .factory('DiffService', DiffService);

    /* @ngInject */
    function DiffService($q, $http) {
        
        var service = {
            getModules: getModules
        };

        return service;

        ///////////////

        function getModules() {
            return $http.get('app/global/data/diff.json');
        }

    }
})();
