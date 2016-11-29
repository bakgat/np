(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('ReportListController', ReportListController);

    /* @ngInject */
    function ReportListController($sce, pdfAddress) {
        var vm = this;

        vm.pdfAddress = pdfAddress;
        vm.trustedAddress = trustedAddress;

        init();
        //////////////////////////////////////
        function init() {

        }

        function trustedAddress() {
            return $sce.trustAsResourceUrl(vm.pdfAddress);
        }
    };
})();
