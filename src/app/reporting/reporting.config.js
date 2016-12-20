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
                .state('triangular.reporting.iacs', {
                    url: '/iac',
                    views: {
                        '@triangular': {
                            templateUrl: 'app/reporting/iac/iac-list.tmpl.html',
                            // set the controller to load for this page
                            controller: 'IacListController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        iacs: function(IacService, UserService) {
                            return UserService.getActiveGroup().then(function(response) {
                                //return Restangular.all('iac').getList({'group': response.id});
                                return IacService.getList({ 'group': response.id });
                            });
                        }
                    },
                    data: {
                        permissions: {
                            only: ['reportingIAC']
                        }
                    }
                })
                .state('triangular.reporting.iacs.iac', {
                    url: '/iac/:iacId',
                    templateUrl: 'app/reporting/iac/student-iac.tmpl.html',
                    controller: 'StudentIACController',
                    controllerAs: 'vm',
                    resolve: {
                        iac: function($stateParams, iacs) {
                            var id = $stateParams.iacId;
                            var foundIac = false;
                            for (var i = 0; i < iacs.length; i++) {
                                if (id == iacs[i].id) {
                                    foundIac = iacs[i];
                                }
                            }
                            return foundIac;
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
                        evaluations: function(EvaluationService, UserService, DateRangeService) {
                            return UserService.getActiveGroup().then(function(response) {
                                var range = DateRangeService.range(),
                                    start = range.start.format('YYYY-MM-DD'),
                                    end = range.end.format('YYYY-MM-DD');
                                return EvaluationService.getList({ group: response.id, start: start, end: end });
                            });
                        },
                        branches: function(BranchService, UserService) {
                            return UserService.getActiveGroup().then(function(response) {
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
                })
                .state('triangular.reporting.reports', {
                    url: '',
                    views: {
                        '@triangular': {
                            templateUrl: 'app/reporting/reports/report-list.tmpl.html',
                            controller: 'ReportListController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        students: function(StudentService, UserService) {
                            return UserService.getActiveGroup().then(function(response) {
                                return StudentService.getList({ 'group': response.id });
                            });
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
                }, {
                    name: 'Aangepaste leerlijnen',
                    state: 'triangular.reporting.iacs',
                    icon: 'zmdi zmdi-arrow-split',
                    type: 'link'
                }, {
                    name: 'Rapporten',
                    state: 'triangular.reporting.reports',
                    icon: 'zmdi zmdi-print',
                    type: 'link'
                }]
            });
        }
    })();
