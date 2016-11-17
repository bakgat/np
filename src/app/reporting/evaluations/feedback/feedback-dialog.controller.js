(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('FeedbackDialogController', FeedbackDialogController);

    /* @ngInject */
    function FeedbackDialogController($scope, $timeout, $mdDialog, $filter, _, triSkins, evaluation,
        EvaluationService, StudentService, UserService) {

        var vm = this;
        vm.cancel = cancel;
        vm.evaluation = evaluation;

        vm.selectedStudents = [];
        //actions
        vm.save = save;
        vm.close = close;

        vm.selectStudents = selectStudents;
        vm.prepareInput = prepareInput;

        init();
        ///////////////

        function init() {


            if (vm.evaluation.date) {
                vm.evaluation.date = new Date(vm.evaluation.date);
            } else {
                vm.evaluation.date = new Date();
            }

            vm.edit = vm.evaluation.feedbackResults;

            UserService.getActiveGroup().then(function(profile) {
                profile.all('branches').getList({'evaluationtype':'F'}).then(function(bfg) {
                    vm.evaluation.branchForGroup = bfg[0];
                });
                StudentService.getList({ 'group': profile.id })
                    .then(function(response) {
                        vm.students = response;

                        if (!vm.evaluation.feedbackResults) {
                            vm.evaluation.feedbackResults = [];


                        } else {
                            vm.selectedStudents = [];
                            angular.forEach(vm.evaluation.feedbackResults, function(result) {
                                var student = _.find(vm.students, function(s) {
                                    return result.student.id == s.id;
                                });
                                vm.selectedStudents.push(student);
                            });

                            prepareInput();

                        }
                    });
            });

        }

        function cancel() {
            vm.selectedStudents = [];
            $mdDialog.cancel();
        }

        function save() {
            vm.selectedStudents = [];
            $mdDialog.hide(vm.evaluation);
        }



        function prepareInput() {

            /*
                => generate empty results for each student
                => block students not in selected students (when selection was made)
                => when edit => selection is available results
            */
            angular.forEach(vm.selectedStudents, function(student) {
                var found = _.findIndex(vm.evaluation.feedbackResults, function(result) {
                    return result.student.id == student.id
                }) >= 0;
                if (!found) {
                    vm.evaluation.feedbackResults.push({
                        student: student,
                    });
                }
            });
            angular.forEach(vm.evaluation.feedbackResults, function(result) {
                var isBlocked = _.findIndex(vm.selectedStudents, function(ss) {
                    return result.student.id == ss.id
                }) == -1;

                result.block = isBlocked;
            });

        }


        function selectStudents(type) {

            if (type == null ||  type == 'all') {
                vm.selectedStudents = angular.copy(vm.students);

            } else {
                vm.selectedStudents = _.filter(vm.students, function(student) {
                    if (student.redicodi && _.find(student.redicodi, { 'name': type })) {
                        return student;
                    }
                });
            }
            prepareInput();
        }


    }
})();
