(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('MultiplechoiceDialogController', MultiplechoiceDialogController);

    /* @ngInject */
    function MultiplechoiceDialogController($scope, $timeout, $mdDialog, $filter, _, triSkins, evaluation,
        EvaluationService, StudentService, UserService) {

        var vm = this;
        vm.cancel = cancel;
        vm.evaluation = evaluation;

        vm.selectedStudents = [];

        vm.hasRedicodi = hasRedicodi;
        vm.extraOption = null;


        //actions
        vm.save = save;
        vm.close = close;

        vm.selectStudents = selectStudents;
        vm.prepareInput = prepareInput;

        vm.addOption = addOption;
        vm.removeOption = removeOption;

        vm.toggleRedicodi = toggleRedicodi;

        init();
        ///////////////


        function init() {
            if (vm.evaluation.settings) {
                vm.evaluation.settings = eval(vm.evaluation.settings);
            } else {
                vm.evaluation.settings = {
                    options: [],
                    type: null,
                    printOhter: true,
                    multiple: false,
                    selected: 'bold',
                    notSelected: ''
                }
            }


            if (vm.evaluation.date) {
                vm.evaluation.date = new Date(vm.evaluation.date);
            } else {
                vm.evaluation.date = new Date();
            }


            UserService.getActiveGroup().then(function(profile) {
                StudentService.getList({ 'group': profile.id })
                    .then(function(response) {
                        vm.students = response;

                        if (!vm.evaluation.multiplechoiceResults) {
                            vm.evaluation.multiplechoiceResults = [];


                        } else {
                            vm.selectedStudents = [];
                            angular.forEach(vm.evaluation.multiplechoiceResults, function(result) {
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
            vm.evaluation.settings = JSON.stringify(vm.evaluation.settings);
            vm.selectedStudents = [];
            $mdDialog.hide(vm.evaluation);
        }



        function hasRedicodi(result, type) {

            if (!result.redicodi) return false;

            if (type == null) {
                //TODO: how comes that a submitted evaluation has redicodi[0] = '' by default
                if (result.redicodi.length == 1 && result.redicodi[0] == '') {
                    return false;
                } else {
                    return result.redicodi.length > 0;
                }
            }
            return _.indexOf(result.redicodi, type) > -1;
        }

        function toggleRedicodi(result, type) {
            var idx = _.indexOf(result.redicodi, type);
            if (idx > -1) {
                result.redicodi.splice(idx, 1);
            } else {
                result.redicodi.push(type);
            }
        }


        function prepareInput() {

            /*
                => generate empty results for each student
                => block students not in selected students (when selection was made)
                => when edit => selection is available results
            */
            angular.forEach(vm.selectedStudents, function(student) {
                var found = _.findIndex(vm.evaluation.multiplechoiceResults, function(result) {
                    return result.student.id == student.id
                }) >= 0;
                if (!found) {
                    vm.evaluation.multiplechoiceResults.push({
                        student: student,
                        selected: null,
                        redicodi: []
                    });
                }
            });
            angular.forEach(vm.evaluation.multiplechoiceResults, function(result) {
                var isBlocked = _.findIndex(vm.selectedStudents, function(ss) {
                    return result.student.id == ss.id
                }) == -1;

                result.block = isBlocked;
            });

            vm.selectedStep = 2;
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

        function addOption(option) {
            if (_.indexOf(vm.evaluation.settings.options, option) == -1) {
                vm.evaluation.settings.options.push(option);
            }
            vm.extraOption = null;
        }

        function removeOption(option) {
            _.remove(vm.evaluation.settings.options, function(opt) {
                return opt == option;
            });
        }

    }
})();
