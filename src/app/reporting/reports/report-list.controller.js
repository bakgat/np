(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('ReportListController', ReportListController);

    /* @ngInject */
    function ReportListController(BaseStateService, UserService, _env, $window, DateRangeService) {
        var vm = this;

        vm.generateReport = generateReport;
        vm.range = DateRangeService.range();

        init();
        //////////////////////////////////////
        function init() {
            BaseStateService.setBaseState('triangular.reporting.reports');
        }

        function generateReport() {
            UserService.getActiveGroup().then(function(group) {
                var request = _env.api;
                request += '/pdf/report';
                request += '/group/' + group.id;

                var query = [];
                query.push('qstart=' + vm.range.start.format('YYYY-MM-DD'));
                query.push('qend=' + vm.range.end.format('YYYY-MM-DD'));
                query.push('render=' + vm.content);

                request += '?' + query.join('&');

                $window.open(request, '_blank');
            });
        }
    };
})();
