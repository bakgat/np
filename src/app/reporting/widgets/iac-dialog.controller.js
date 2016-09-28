(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('IacDialogController', IacDialogController);

    /* @ngInject */
    function IacDialogController($scope, $timeout, $mdDialog, $filter, _, triSkins, evaluation,
        EvaluationService, StudentService) {

        var vm = this;
        vm.cancel = cancel;
        vm.evaluation = evaluation;

        vm.selectedStudent = null;

        //actions
        vm.save = save;
        vm.close = close;

        init();
        ///////////////

        function init() {

            StudentService.getStudentsByGroup('3A')
                .then(function(students) {
                    vm.students = students;
                });

            // EvaluationService.getStudents()
            //     .then(function(students) {
            //         vm.students = _.map(vm.evaluation.results, function(result) {
            //             return result.student;
            //         });
            //         return;
            //         vm.students = _.map(students, function(student) {
            //             if (student.classGroup.name === '3A')
            //                 return student;
            //         });
            //     });


        }

        function cancel() {
            $mdDialog.cancel();
        }

        function save() {
            $mdDialog.hide(vm.evaluation);
        }

       

    }
})();
