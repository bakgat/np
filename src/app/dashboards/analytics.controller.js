(function() {
    'use strict';

    angular
        .module('app.dashboards')
        .controller('AnalyticsController', AnalyticsController);

    /* @ngInject */
    function AnalyticsController(UserService) {
        var vm = this;

        vm.user = UserService.getCurrentUser();
        //////////////////////////////

    }
})();
