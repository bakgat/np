(function() {
    'use strict';

    angular
        .module('app.manage')
        .controller('AddToGroupDialogController', AddToGroupDialogController);

    /* @ngInject */
    function AddToGroupDialogController($scope, $timeout, $mdDialog, $filter, _, GroupService, StaffService, groupperiod, from) {

        var vm = this;
        vm.cancel = cancel;
        vm.save = save;

        vm.groups = [];
        vm.staffTypes = [];
        vm.fromStaff = (from == 'staff');
        vm.fromStudent = (from == 'student');

        vm.groupperiod = groupperiod;


        init();
        ///////////////


        function init() {
            
            GroupService.getList({ active: true })
                .then(function(response) {
                    vm.groups = response;
                });
            if (vm.fromStaff) {
                StaffService.all('types').getList()
                    .then(function(response) {
                        vm.staffTypes = response;
                    });
            }
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $mdDialog.hide(vm.groupperiod);
        }

    }
})();
