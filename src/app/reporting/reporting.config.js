    (function() {
        'use strict';

        angular
            .module('app.reporting')
            .config(moduleConfig);

        /* @ngInject */
        function moduleConfig($stateProvider, triMenuProvider) {

            $stateProvider
                .state('triangular.reporting', {
                    abstract: true,
                    url: '/reporting',
                    views: {
                        'toolbar@triangular': {
                            templateUrl: 'app/reporting/layout/toolbar/toolbar.tmpl.html',
                            controller: 'ReportingToolbarController',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        layout: {
                            contentClass: 'triangular-non-scrolling',
                            footer: false
                        },
                        permissions: {
                            only: ['reporting']
                        }
                    }
                })
                .state('triangular.reporting.iac', {
                    url: '/iac',
                    views: {
                        '@triangular': {
                            templateUrl: 'app/reporting/iac/iac-list.tmpl.html',
                            // set the controller to load for this page
                            controller: 'IacListController',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        permissions: {
                            only: ['reportingIAC']
                        }
                    }
                })
                .state('triangular.reporting.iac.student', {
                    url: '/student/:studentId',
                    templateUrl: 'app/reporting/iac/student-iac.tmpl.html',
                    controller: 'StudentIACController',
                    controllerAs: 'vm',
                    resolve: {
                        iac: function() {
                            return [
                                { text: 'Optellen tot 10 zonder brug', isAchieved: true, isPractice: false, comment: 'Prima gedaan!' },
                                { text: 'Optellen tot 20 zonder brug', isAchieved: true, isPractice: false, comment: '' },
                                { text: 'Optellen tot 20 met brug', isAchieved: null, isPractice: null, comment: null },
                                { text: 'Aftrekken tot 10 zonder brug', isAchieved: false, isPractice: true, comment: 'Nog veel werk, Marina!' },
                            ];
                        }
                    }
                })
                .state('triangular.reporting.evaluations', {
                    url: '/evaluations',
                    views: {
                        '@triangular': {
                            templateUrl: 'app/reporting/evaluation-list.tmpl.html',
                            // set the controller to load for this page
                            controller: 'EvaluationListController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        evaluations: function(EvaluationService, ProfileService) {
                            return ProfileService.activeGroup().then(function(response) {
                                return EvaluationService.getList({ 'group': response.id });
                            });
                        },
                        branches: function(BranchService, ProfileService) {
                            return ProfileService.activeGroup().then(function(response) {
                                return BranchService.getList({ 'group': response.id });
                            });
                        }
                    },
                    data: {
                        permissions: {
                            only: ['reportingEvaluations']
                        }
                    }

                })
                .state('triangular.reporting.evaluations.evaluation', {
                    url: '/evaluation/:evaluationId',
                    templateUrl: 'app/reporting/evaluation.tmpl.html',
                    controller: 'EvaluationController',
                    controllerAs: 'vm',
                    resolve: {
                        evaluation: function($stateParams, evaluations) {
                            var id = $stateParams.evaluationId;
                            var foundEvaluation = false;
                            for (var i = 0; i < evaluations.length; i++) {
                                if (id == evaluations[i].id) {
                                    foundEvaluation = evaluations[i];
                                }
                            }
                            return foundEvaluation.get();
                        }
                    }
                });

            triMenuProvider.addMenu({
                name: 'Evalueren',
                icon: 'zmdi zmdi-collection-text',
                type: 'dropdown',
                priority: 2,
                permission: 'reporting',
                children: [{
                        name: 'Evaluaties',
                        state: 'triangular.reporting.evaluations',
                        icon: 'zmdi zmdi-keyboard',
                        type: 'link',
                        permission: 'reportingEvaluations'
                    }
                    /*, {
                        name: 'Aangepaste leerlijnen',
                        state: 'triangular.reporting.iac',
                        icon: 'zmdi zmdi-arrow-split',
                        type: 'link'
                    }, {
                        name: 'Rapporten',
                        state: 'triangular.reporting.reports',
                        icon: 'zmdi zmdi-print',
                        type: 'link'
                    }*/
                ]
            });
        }
    })();
