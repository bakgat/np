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

        function save() {
            $mdDialog.hide(vm.diffmodule);
        }

    }
})();
