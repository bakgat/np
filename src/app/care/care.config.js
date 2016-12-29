    (function() {
        'use strict';

        angular
            .module('app.care')
            .config(moduleConfig);

        /* @ngInject */
        function moduleConfig($stateProvider, triMenuProvider) {


            $stateProvider
                .state('triangular.care', {
                    abstract: true,
                    url: '/care',
                    views: {
                        'toolbar@triangular': {
                            templateUrl: 'app/care/layout/toolbar/toolbar.tmpl.html',
                            controller: 'CareToolbarController',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        layout: {
                            contentClass: 'triangular-non-scrolling',
                            footer: false,
                            sideMenuSize: 'icon'
                        },
                        permissions: {
                            only: ['care']
                        }
                    }
                })
                .state('triangular.care.records', {
                    url: '/records',
                    views: {
                        '@triangular': {
                            templateUrl: 'app/care/student-list.tmpl.html',
                            // set the controller to load for this page
                            controller: 'StudentRecordListController',
                            controllerAs: 'vm',
                        }
                    },
                    resolve: {
                        students: function(UserService, StudentService) {
                            return UserService.getActiveGroup().then(function(response) {
                                return StudentService.getList({ 'group': response.id });
                            });

                        }
                    }
                })
                .state('triangular.care.records.record', {
                    url: '/student/:studentId',
                    templateUrl: 'app/care/student-record.tmpl.html',
                    controller: 'StudentRecordController',
                    controllerAs: 'vm',
                    resolve: {
                        student: function($stateParams, students) {
                            var id = $stateParams.studentId;
                            var foundStudent = false;
                            for (var i = 0; i < students.length; i++) {
                                if (id == students[i].id) {
                                    foundStudent = students[i];
                                    break;
                                }
                            }
                            return foundStudent.get();
                        },
                        modules: function(DiffService) {
                            return DiffService.getModules();
                        }
                    }
                });

            triMenuProvider.addMenu({
                name: 'Zorg',
                icon: 'zmdi zmdi-favorite',
                type: 'link',
                priority: 1,
                state: 'triangular.care.records',
                permission: 'care'
            });
        }
    })();
