(function() {
    'use strict';

    angular
        .module('app.manage')
        .controller('AddToRoleDialogController', AddToRoleDialogController);

    /* @ngInject */
    function AddToRoleDialogController($scope, $timeout, $mdDialog, $filter, _, RoleService, roleperiod) {

        var vm = this;
        vm.cancel = cancel;
        vm.save = save;

        vm.roles = [];

        vm.roleperiod = roleperiod;


        init();
        ///////////////


        function init() {
            RoleService.getList()
                .then(function(response) {
                    vm.roles = response;
                });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $mdDialog.hide(vm.roleperiod);
        }

    }
})();
