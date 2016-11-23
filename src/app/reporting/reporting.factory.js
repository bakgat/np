(function() {
    'use strict';

    angular
        .module('app.reporting')
        .factory('ReportingService', ReportingService);

    /* @ngInject */
    function ReportingService(HTTPCache) {
        return HTTPCache.all('report');
    }
})();
