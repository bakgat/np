(function() {
    'use strict';

    angular
        .module('app.manage')
        .controller('StudentListController', StudentListController);

    /* @ngInject */
    function StudentListController($scope, $filter, $location, $state, $mdMedia, $mdBottomSheet,
        $stateParams, $mdDialog, $mdToast, BaseStateService, students, activeGroup, StudentService) {
        var vm = this;

        
        vm.composeClick = composeClick;
        vm.inboxBasePath = $location.path();

        vm.openStudent = openStudent;
        // store selected student if we have one
        vm.selectedStudent = null;
        // variable to store backup of emailGroups for search filtering
        var studentGroupsBackup = null;


        init();
        ////////////////////
        function init() {
            BaseStateService.setBaseState('triangular.manage.students');
            createStudentGroups();
        }

        function createStudentGroups() {
            // create email groups using the emails from the resolve
            vm.students = students;

            var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            vm.studentGroups = [];
            angular.forEach(letters, function(letter) {
                vm.studentGroups.push({
                    name: letter,
                    students: []
                });
            });

            angular.forEach(vm.studentGroups, function(group) {
                group.students = $filter('personGroup')(vm.students, group);
            });

            // create backup of emailGroups for search filtering
            studentGroupsBackup = angular.copy(vm.studentGroups);

        }

        // opens an student
        function openStudent(student) {
            $state.go(BaseStateService.baseState + '.student', {
                studentId: student.id
            });
        }

        // returns back to email list
        function openlist() {
            $state.go(BaseStateService.baseState);
        }

        // opens the compose dialog
        function composeClick($event) {
            $mdDialog.show({
                    controller: 'ComposeStudentController',
                    controllerAs: 'vm',
                    templateUrl: 'app/manage/students/compose-student.tmpl.html',
                    targetEvent: $event,
                    locals: {
                        person: {
                            firstName: '',
                            lastName: '',
                            email: '',
                            gender: '',
                            birthday: null,
                            group: activeGroup,
                            groupnumber: null
                        }
                    }
                })
                .then(saveStudent, cancelStudent);

            function cancelStudent() {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('triTranslate')('Geannuleerd'))
                    .position('bottom right')
                    .action('Ok')
                    .hideDelay(3000)
                );
            }
        }

        function saveStudent(student) {
            StudentService.post(student).then(insertStudent);
        }

        function insertStudent(student) {
            var foundStudent = false;
            var i = 0;
            for (i = 0; i < vm.students.length; i++) {
                if (vm.students[i].id == student.id) {
                    vm.students.splice(i, 1, student);
                    foundStudent = true;
                    break;
                }
            }
            if (!foundStudent) {
                vm.students.push(student);
            }
            createStudentGroups();
        }

        function checkEmailList() {
            vm.showEmailList = !($mdMedia('xs') && angular.isDefined($state.current.resolve.email));
        }

        // watches

        $scope.$on('studentSaved', function($event, student) {
            insertStudent(student);
        });

        $scope.$on('studentOpenend', function($event, student) {
            vm.selectedStudent = student.id;
        });
        // handle close student event sent from student menu in student view
        $scope.$on('closeStudent', function() {
            vm.selectedStudent = null;
            openlist();
        });

    }
})();
