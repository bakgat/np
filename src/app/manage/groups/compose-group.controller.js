(function() {
    'use strict';

    angular
        .module('app.manage')
        .controller('ComposeGroupController', ComposeGroupController);

    /* @ngInject */
    function ComposeGroupController($scope, $mdDialog, group) {

        var vm = this;
        vm.cancel = cancel;
        vm.group = group;


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
            $mdDialog.hide(vm.group);
        }
    }
})();
