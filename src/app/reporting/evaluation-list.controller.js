(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('EvaluationListController', EvaluationListController);

    /* @ngInject */
    function EvaluationListController($scope, $filter, $state, $mdDialog, $mdToast,
        evaluations, branches, $rootScope, EvaluationService) {
        var vm = this;

        vm.baseState = 'triangular.reporting.evaluations';
        vm.composeClick = composeClick;

        vm.openEvaluation = openEvaluation;

        vm.selectedEvaluation = null;
        var evaluationGroupsBackup = null;


        init();
        //////////////////////////////////////

        function init() {
            createEvaluationGroups();
        }

        function createEvaluationGroups() {
            vm.evaluations = evaluations;

            var majors = branches;

            vm.evaluationGroups = [];

            angular.forEach(majors, function(major) {
                vm.evaluationGroups.push({
                    major: major,
                    evaluations: []
                });
            });
            angular.forEach(vm.evaluationGroups, function(group) {
                group.evaluations = $filter('majorGroup')(vm.evaluations, group);
            });

            evaluationGroupsBackup = angular.copy(vm.evaluationGroups);

        }

        function composeClick(action, $event) {
            var controller = action.capitalizeFirstLetter() + 'DialogController';
            var templateUrl = 'app/reporting/' + action + '-dialog.tmpl.html';

            $mdDialog.show({
                    controller: controller,
                    controllerAs: 'vm',
                    templateUrl: templateUrl,
                    targetEvent: $event,
                    locals: {
                        evaluation: {}
                    },
                    focusOnOpen: false,
                    fullscreen: action === 'feedback'
                })
                .then(saveEvaluation, cancelEvaluation);

            function cancelEvaluation() {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('triTranslate')('Evaluation canceled'))
                    .position('bottom right')
                    .hideDelay(3000)
                );
            }
        }

        function saveEvaluation(evaluation) {
            EvaluationService.post(evaluation).then(insertEvaluation);
        }

        function insertEvaluation(evaluation) {
            var foundEvaluation = false;
            var i = 0;
            for (i = 0; i < vm.evaluations.length; i++) {
                if (vm.evaluations[i].id == evaluation.id) {
                    vm.evaluations.splice(i, 1, evaluation);
                    foundEvaluation = true;
                    break;
                }
            }
            if (!foundEvaluation) {
                vm.evaluations.push(evaluation);
            }
            createEvaluationGroups();
        }

        function openEvaluation(evaluation) {
            $state.go(vm.baseState + '.evaluation', {
                evaluationId: evaluation.id
            });
            vm.selectedEvaluation = evaluation.id;
        }


        function openList() {
            $state.go(vm.baseState);
        }


        //watches
        $scope.$on('closeEvaluation', function() {
            vm.selectedEvaluation = null;
            openList();
        });

        $scope.$on('evaluationSaved', function($event, evaluation) {
            insertEvaluation(evaluation);
        });

        $scope.$on('saveEvaluation', function($event, evaluation) {
            saveEvaluation(evaluation);
        });

        $scope.$on('evaluationOpened', function(evaluation) {
            vm.selectedEvaluation = evaluation;
        });
    }
})();
