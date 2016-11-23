/* global d3 */
(function() {
    'use strict';

    angular
        .module('app.dashboards')
        .controller('DashboardAnalyticsController', DashboardAnalyticsController);

    /* @ngInject */
    function DashboardAnalyticsController(analytics) {
        var vm = this;
     
        vm.data = analytics;

        // init
        init();
        /////////////////////

        function init() {
          
        }

    }
})();
