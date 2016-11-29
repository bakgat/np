(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('ReportListController', ReportListController);

    /* @ngInject */
    function ReportListController(BaseStateService, $sce, pdfAddress) {
        var vm = this;

        vm.pdfAddress = pdfAddress;
        vm.trustedAddress = trustedAddress;

        init();
        //////////////////////////////////////
        function init() {
            BaseStateService.setBaseState('triangular.reporting.reports');
        }

        function trustedAddress() {
            return $sce.trustAsResourceUrl(vm.pdfAddress);
        }
    };
})();
