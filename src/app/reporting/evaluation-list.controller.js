(function() {
    'use strict';

    angular
        .module('app.reporting')
        .controller('EvaluationListController', EvaluationListController);

    /* @ngInject */
    function EvaluationListController($scope, $filter, $state, $mdDialog, $mdToast, BaseStateService,
        evaluations, branches, EvaluationService) {
        var vm = this;

        vm.composeClick = composeClick;

        vm.openEvaluation = openEvaluation;
        vm.makeBranchIcon = makeBranchIcon;
        vm.setTypeIcon = setTypeIcon;

        vm.selectedEvaluation = null;
        var evaluationGroupsBackup = null;


        init();
        //////////////////////////////////////

        function init() {
            BaseStateService.setBaseState('triangular.reporting.evaluations');
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
            var templateUrl = 'app/reporting/evaluations/' + action + '/' + action + '-dialog.tmpl.html';

            $mdDialog.show({
                    controller: controller,
                    controllerAs: 'vm',
                    templateUrl: templateUrl,
                    targetEvent: $event,
                    locals: {
                        evaluation: {
                            permanent: true
                        }
                    },
                    focusOnOpen: false
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
            console.log(evaluation);
            EvaluationService.post(evaluation).then(insertEvaluation);
        }

        function removeEvaluation(evaluation) {
            var i = 0;
            for (i = 0; i < vm.evaluations.length; i++) {
                if (vm.evaluations[i].id == evaluation.id) {
                    vm.evaluations.splice(i, 1);
                    break;
                }
            }
            createEvaluationGroups();
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
            $state.go(BaseStateService.baseState + '.evaluation', {
                evaluationId: evaluation.id
            });
            vm.selectedEvaluation = evaluation.id;
        }


        function openList() {
            $state.go(BaseStateService.baseState);
        }

        function makeBranchIcon(branch) {
            var icon = '';
            switch (branch.name) {
                case 'getallenkennis':
                    icon = 'gk';
                    break;
                case 'hoofdrekenen':
                    icon = 'hr';
                    break;
                case 'cijferen':
                    icon = 'c';
                    break;
                case 'meetkunde':
                    icon = 'mk';
                    break;
                case 'meten en metend rekenen':
                    icon = 'mr';
                    break;
                case 'toepassingen':
                    icon = 't';
                    break;
                default:
                    icon = 'branch';
                    break;
            }
            return 'assets/images/icons/branches/' + icon + '.png';
        }

        function setTypeIcon(type) {
            var icon = '';
            switch (type) {
                case 'P':
                    icon = 'zmdi-collection-item-9-plus';
                    break;
                case 'C':
                    icon = 'zmdi-collection-text';
                    break;
                case 'S':
                    icon = 'notos notos-spoken';
                    break;
                case 'MC':
                    icon = 'zmdi zmdi-format-list-numbered';
                    break;
                default:
                    icon = 'zmdi-circle';
                    break;
            }
            return 'zmdi ' + icon;
        }

        function closeEvaluation() {
            vm.selectedEvaluation = null;
            openList();
        }
        //watches
        $scope.$on('closeEvaluation', closeEvaluation);

        $scope.$on('evaluationSaved', function($event, evaluation) {
            insertEvaluation(evaluation);
        });

        $scope.$on('saveEvaluation', function($event, evaluation) {
            saveEvaluation(evaluation);
        });

        $scope.$on('removeEvaluation', function($event, evaluation) {
            removeEvaluation(evaluation);
            closeEvaluation();
        });

        $scope.$on('evaluationOpened', function(evaluation) {
            vm.selectedEvaluation = evaluation;
        });
    }
})();
