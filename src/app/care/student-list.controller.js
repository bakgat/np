(function() {
    'use strict';

    angular
        .module('app.care')
        .controller('StudentRecordListController', StudentRecordListController);

    /* @ngInject */
    function StudentRecordListController($scope, $filter, $location, $timeout, $state, $mdMedia,
        $mdBottomSheet, $stateParams, $mdDialog, $mdToast, triLayout,  BaseStateService,
        students) {
        var vm = this;
        // store the base state of where we are /inbox or /trash or /sent
        // this can be then used if we close / delete email to return to
        vm.baseState = 'triangular.care.records';

        vm.openStudent = openStudent;
        // store selected email if we have one
        vm.selectedStudent = null;
        // variable to store backup of emailGroups for search filtering
        var studentGroupsBackup = null;


        init();
        ////////////////////
        function init() {
            BaseStateService.setBaseState('triangular.care.records');
            checkStudentList();
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

        function checkStudentList() {
            vm.showStudentList = !angular.isDefined($state.current.resolve.student);
        }


        // opens an student
        function openStudent(student) {
            $state.go(vm.baseState + '.record', {
                studentId: student.id
            });
            vm.selectedStudent = student.id;
        }

        // returns back to email list
        function openlist() {
            $state.go(BaseStateService.baseState);
        }

        // watches
        $scope.$on('studentSearch', function(event, studentSearch) {
            $timeout(function() {
                for (var g in studentGroupsBackup) {
                    vm.studentGroups[g].students = $filter('studentSearchFilter')(studentGroupsBackup[g].students, studentSearch);
                }
            });
        });


        // add a watch for when the url location changes
        $scope.$on('$locationChangeSuccess', checkStudentList);

        // handle close student event sent from student menu in student view
        $scope.$on('closeStudent', function() {
            vm.selectedStudent = null;
            openlist();
        });

    }
})();
