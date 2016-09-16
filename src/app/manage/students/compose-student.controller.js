(function() {
    'use strict';

    angular
        .module('app.manage')
        .controller('ComposeStudentController', ComposeStudentController);

    /* @ngInject */
    function ComposeStudentController($scope, $mdDialog, person, GroupService) {

        var vm = this;
        vm.cancel = cancel;
        vm.person = person;
        
        vm.groups = [];

        //actions
        vm.save = save;
        vm.close = close;


     
        init();
        ///////////////

        function init() {
            GroupService.getList({active:true})
            .then(function(response) {
                vm.groups = response;
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $mdDialog.hide(vm.person);
        }
    }
})();
