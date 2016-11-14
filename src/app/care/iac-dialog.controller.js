(function() {
    'use strict';

    angular
        .module('app.care')
        .controller('CareIacDialogController', CareIacDialogController);

    /* @ngInject */
    function CareIacDialogController($scope, $timeout, $mdDialog, $filter, _, iac, IacService) {

        var vm = this;

        vm.majors = [];
        vm.iac = iac;

        //actions
        vm.cancel = cancel;
        vm.save = save;

        vm.compareIacGoal = compareIacGoal;


        init();
        ///////////////

        function init() { 
            loadGoals();
        }

        function loadGoals() {
            IacService.one('goals').getList().then(function(response) {
                vm.majors = response;
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $mdDialog.hide(vm.iac);
        }

        function compareIacGoal(obj1, obj2) {
            if (obj1.goal) {
                return obj1.goal.id === obj2.id;
            } else if(obj2.goals) {
                return obj1.id === obj2.goal.id;
            } else {
                return obj1.id === obj2.id;
            }
        };

    }
})();
