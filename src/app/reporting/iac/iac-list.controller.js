(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('IacListController', IacListController);

    /* @ngInject */
    function IacListController($state) {
        var vm = this;
        vm.openIAC = openIAC;


        function openIAC(iac) {
          $state.go('triangular.reporting.iac.student', {id: 1});
        }
    }
})();