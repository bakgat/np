(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('ReportListController', ReportListController);

    /* @ngInject */
    function ReportListController(BaseStateService, UserService, _env, $window) {
        var vm = this;

        vm.generateReport = generateReport;

        init();
        //////////////////////////////////////
        function init() {
            BaseStateService.setBaseState('triangular.reporting.reports');
        }

        function generateReport() {
            UserService.getActiveGroup().then(function(group) {
                $window.open(_env.api + '/pdf/report/group/' + group.id, '_blank');
            });
        }
    };
})();
