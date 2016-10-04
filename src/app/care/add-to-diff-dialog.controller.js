(function() {
    'use strict';

    angular
        .module('app.care')
        .controller('AddToDiffDialogController', AddToDiffDialogController);

    /* @ngInject */
    function AddToDiffDialogController($scope, $timeout, $mdDialog, $filter, _,  DiffService, redicodiPeriod) {

        var vm = this;

        vm.modules = [];
        vm.diffmodule = redicodiPeriod;

        //actions

        vm.cancel = cancel;
        vm.save = save;



        init();
        ///////////////

        function init() { 
            //TODO: stop renaming !!
            vm.diffmodule.redicodi = redicodiPeriod.module;
            DiffService.getModules()
                .then(function(modules) {
                    if (modules.status === 200) {
                        vm.modules = modules.data;
                    }
                });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        $scope.$watch('vm.diffmodule.branch', function(b) {
             if (b == '') {
                vm.diffmodule.branch = null;
            }
        });
        $scope.$watch('vm.diffmodule.major', function(m) {
            if (m == '') {
                vm.diffmodule.major = null;
            }
        });

        function save() {
            $mdDialog.hide(vm.diffmodule);
        }

    }
})();
