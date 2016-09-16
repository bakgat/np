(function() {
    'use strict';

    angular
        .module('app.global')
        .factory('IacService', IacService);

    /* @ngInject */
    function IacService($q, $http) {
        
        var service = {
            getObjectives: getObjectives
        };

        return service;

        ///////////////

        function getObjectives(course) {
            return $http.get('app/global/data/iac_objectives.json');
        }

    }
})();
