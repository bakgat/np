(function() {
    'use strict';

    angular
        .module('app.manage')
        .controller('ComposeStaffController', ComposeStaffController);

    /* @ngInject */
    function ComposeStaffController($scope, $mdDialog, person) {

        var vm = this;
        vm.cancel = cancel;
        vm.person = person;


        //actions
        vm.save = save;
        vm.close = close;

     
        init();
        ///////////////

        function init() {

        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $mdDialog.hide(vm.person);
        }
    }
})();
