(function() {
    'use strict';

    angular
        .module('app.manage')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
            .state('triangular.manage', {
                abstract: true,
                url: '/manage',
                data: {
                    layout: {
                        contentClass: 'triangular-non-scrolling',
                        footer: false
                    },
                    permissions: {
                        only: ['manage']
                    }
                }
            })
            .state('triangular.manage.students', {
                url: '/students',
                views: {
                    '@triangular': {
                        templateUrl: 'app/manage/students/student-list.tmpl.html',
                        // set the controller to load for this page
                        controller: 'StudentListController',
                        controllerAs: 'vm'
                    },
                    'toolbar@triangular': {
                        templateUrl: 'app/manage/layout/toolbar/student.toolbar.tmpl.html',
                        controller: 'StudentToolbarController',
                        controllerAs: 'vm'
                    }
                },

                resolve: {
                    students: function(StudentService, ProfileService) {
                        return ProfileService.activeGroup().then(function(response) {
                            return StudentService.getList({ 'group': response.id });
                        });
                    },
                    activeGroup: function(ProfileService) {
                        return ProfileService.activeGroup().then(function(response) {
                            return response;
                        });
                    }
                },
                data: {
                    permissions: {
                        only: ['manageStudents']
                    }
                }
            })
            .state('triangular.manage.students.student', {
                url: '/student/:studentId',
                templateUrl: 'app/manage/students/student.tmpl.html',
                controller: 'StudentController',
                controllerAs: 'vm',
                resolve: {
                    student: function($stateParams, students) {
                        var id = $stateParams.studentId;
                        var foundStudent = false;
                        for (var i = 0; i < students.length; i++) {
                            if (id == students[i].id) {
                                foundStudent = students[i];
                            }
                        }
                        return foundStudent.get();
                    }
                }
            })
            .state('triangular.manage.staff', {
                url: '/staff',
                views: {
                    '@triangular': {
                        templateUrl: 'app/manage/staff/staff-list.tmpl.html',
                        // set the controller to load for this page
                        controller: 'StaffListController',
                        controllerAs: 'vm'
                    },
                    'toolbar@triangular': {
                        templateUrl: 'app/manage/layout/toolbar/staff.toolbar.tmpl.html',
                        controller: 'StaffToolbarController',
                        controllerAs: 'vm'
                    }
                },

                resolve: {
                    staff: function(StaffService) {
                        return StaffService.getList();
                    }
                },
                data: {
                    permissions: {
                        only: ['manageStaff']
                    }
                }
            })
            .state('triangular.manage.staff.member', {
                url: '/member/:memberId',
                templateUrl: 'app/manage/staff/member.tmpl.html',
                controller: 'MemberController',
                controllerAs: 'vm',
                resolve: {
                    member: function($stateParams, staff) {
                        var id = $stateParams.memberId;
                        var foundMember = false;
                        for (var i = 0; i < staff.length; i++) {
                            if (id == staff[i].id) {
                                foundMember = staff[i];
                            }
                        }
                        return foundMember.get();
                    }
                }
            })
            .state('triangular.manage.groups', {
                url: '/groups',
                views: {
                    '@triangular': {
                        templateUrl: 'app/manage/groups/group-list.tmpl.html',
                        // set the controller to load for this page
                        controller: 'GroupListController',
                        controllerAs: 'vm',
                    }
                },
                resolve: {
                    groups: function(GroupService) {
                        return GroupService.getList();
                    }
                },
                data: {
                    permissions: {
                        only: ['manageGroups']
                    }
                }
            })
            .state('triangular.manage.groups.group', {
                url: '/group/:groupId',
                templateUrl: 'app/manage/groups/group.tmpl.html',
                controller: 'GroupController',
                controllerAs: 'vm',
                resolve: {
                    group: function($stateParams, groups) {
                        var id = $stateParams.groupId;
                        var foundGroup = false;
                        for (var i = 0; i < groups.length; i++)  {
                            if (id == groups[i].id) {
                                foundGroup = groups[i];
                            }
                        }
                        return foundGroup.get();
                    },
                    groups: function(groups) {
                        return groups;
                    }
                }
            });

        triMenuProvider.addMenu({
            name: 'Beheer',
            icon: 'zmdi zmdi-settings',
            type: 'dropdown',
            priority: 3,
            permission: 'manage',
            children: [{
                name: 'Leerlingen',
                state: 'triangular.manage.students',
                icon: 'zmdi zmdi-accounts-alt',
                type: 'link',
                permission: 'manageStudents'
            }, {
                name: 'Groepen',
                state: 'triangular.manage.groups',
                icon: 'zmdi zmdi-accounts-alt',
                type: 'link',
                permission: 'manageGroups'
            }, {
                name: 'Personeel',
                state: 'triangular.manage.staff',
                icon: 'zmdi zmdi-accounts-alt',
                type: 'link',
                permission: 'manageStaff'
            }]
        });
    }
})();
