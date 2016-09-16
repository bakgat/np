(function() {
    'use strict';

    angular
        .module('app.dashboards')
        .controller('AnalyticsController', AnalyticsController);

    /* @ngInject */
    function AnalyticsController() {
        var vm = this;
        vm.testData = ['triangular', 'is', 'great'];
    }
})();