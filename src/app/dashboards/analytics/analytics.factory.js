(function() {
    'use strict';

    angular
        .module('app.dashboards')
        .factory('AnalyticsService', AnalyticsService);

    /* @ngInject */
    function AnalyticsService(Restangular) {
        return Restangular.all('analytics');
    }
})();
