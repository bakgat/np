(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('ComprehensiveDialogController', ComprehensiveDialogController);

    /* @ngInject */
    function ComprehensiveDialogController($scope, $timeout, $mdDialog, $filter, _, triSkins, evaluation,
        EvaluationService, StudentService, UserService) {

        var vm = this;
        vm.cancel = cancel;
        vm.evaluation = evaluation;

        vm.selectedStudents = [];

        //actions
        vm.save = save;
        vm.close = close;

        vm.selectAllStudents = selectAllStudents;

        init();
        ///////////////

        function init() {
            if (vm.evaluation.date) {
                vm.evaluation.date = new Date(vm.evaluation.date);
            } else {
                vm.evaluation.date = new Date();
            }


            UserService.getActiveGroup().then(function(profile) {
                StudentService.getList({ 'group': profile.id })
                    .then(function(response) {
                        vm.students = response;
                    });
            });
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $mdDialog.hide(vm.evaluation);
        }

        function selectAllStudents() {
            vm.selectedStudents = angular.copy(vm.students);
        }
    }
})();
