(function() {
    'use strict';

    angular
        .module('app.care')
        .controller('KivaDialogController', KivaDialogController);

    /* @ngInject */
    function KivaDialogController($scope, $timeout, $mdDialog, $filter) {

        var vm = this;

       
        //actions
        vm.cancel = cancel;
        vm.save = save;


        init();
        ///////////////

        function init() { 
            
        }


        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $mdDialog.hide();
        }

       

    }
})();
