(function() {
    'use strict';

    angular
        .module('app.reporting')
        .factory('ReportingService', ReportingService);

    /* @ngInject */
    function ReportingService($q, $http, _, moment, HTTPCache) {
        return HTTPCache.service('report');
    }
})();
