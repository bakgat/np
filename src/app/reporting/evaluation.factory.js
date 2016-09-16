(function() {
    'use strict';

    angular
        .module('app.reporting')
        .factory('EvaluationService', EvaluationService);

    /* @ngInject */
    function EvaluationService($q, $http, _, moment, HTTPCache) {
        return HTTPCache.service('evaluations');
    }
})();
