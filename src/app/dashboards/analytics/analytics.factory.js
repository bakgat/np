(function() {
    'use strict';

    angular
        .module('app.dashboards')
        .factory('AnalyticsService', AnalyticsService);

    /* @ngInject */
    function AnalyticsService(HTTPCache) {
        return HTTPCache.all('analytics');
    }
})();
