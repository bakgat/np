(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('StudentIACController', StudentIACController);

    /* @ngInject */
    function StudentIACController($state, $mdDialog, iac) {
        var vm = this;

        vm.isAchieved = isAchieved;
        vm.isPractice = isPractice;
        vm.editIac = editIac;

        vm.iac = iac;


        function init() {

        }

        function isAchieved(goal) {
            if (goal.achieved == null) {
                return '';
            }
            return goal.achieved ? 'zmdi zmdi-check' : '';
        }

        function isPractice(goal) {
            if (goal.practice == null) {
                return '';
            }
            return goal.practice ? 'zmdi zmdi-check' : '';
        }

        function editIac($event) {
            $mdDialog.show({
                    controller: 'IacDialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/reporting/iac/iac-dialog.tmpl.html',
                    targetEvent: $event,
                    locals: {
                        iac: vm.iac
                    },
                    focusOnOpen: false
                })
                .then(function(iac) {
                    iac.save();
                }, cancelEvaluation);

            function cancelEvaluation() {
                console.log('cancel');
            }

        }
    }
})();
