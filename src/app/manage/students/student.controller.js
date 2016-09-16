(function() {
    'use strict';

    angular
        .module('app.manage')
        .controller('StudentController', StudentController);

    /* @ngInject */
    function StudentController($scope, $stateParams, $mdDialog, $mdToast, $filter, student) {
        var vm = this;

        vm.student = null;
        vm.studentGroups = [];
        vm.backup = angular.copy(student);

        //actions
        vm.closeStudent = closeStudent;
        vm.revert = revert;
        vm.save = save;
        vm.collapseAll = collapseOptions;

        vm.addToGroup = addToGroup;
        vm.openGroup = addToGroup;

        init();
        ///////////////////////

        function init() {
            vm.student = student;
            vm.student.birthday = new Date(vm.student.birthday);

            student.getList('groups').then(function(response) {
                vm.studentGroups = response;
            });
            $scope.$emit('studentOpenend', vm.student);
        }

        function closeStudent() {
            $scope.$emit('closeStudent');
        }

        function revert() {
            vm.student = angular.copy(vm.backup);

            collapseOptions();
        }

        function save()  {
            vm.backup = angular.copy(vm.student);
            vm.student.save().then(studentSaved);
        }

        function studentSaved(response) {
            $scope.$emit('studentSaved', vm.student);
            collapseOptions();
        }


        function collapseOptions() {
            $scope.$broadcast('closeItems');
        }

        function addToGroup($event, groupperiod) {
            if (groupperiod) {
                groupperiod.start = $filter('fromNtDate')(groupperiod.start);
                groupperiod.end = $filter('fromNtDate')(groupperiod.end);
            } else {
                groupperiod = {
                    start: new Date(),
                    end: null,
                    group: {}
                }
            }
            $mdDialog.show({
                controller: 'AddToGroupDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/manage/groups/add-to-group-dialog.tmpl.html',
                targetEvent: $event,
                focusOnOpen: false,
                locals: {
                    groupperiod: groupperiod,
                    from: 'student'
                }
            }).then(function(groupperiod) {
                //Convert date to string to override UTC timezone conversion
                groupperiod.start = $filter('date')(groupperiod.start, 'yyyy-MM-dd');
                groupperiod.end = $filter('date')(groupperiod.end, 'yyyy-MM-dd');

                if (groupperiod.id) {
                    groupperiod.save().then(insertGroup, cancelAddToGroup);
                } else {
                    vm.studentGroups.post(groupperiod).then(insertGroup, cancelAddToGroup);
                }


                function insertGroup(groupperiod) {
                    var foundgroup = false;
                    var i = 0;
                    for (i = 0; i < vm.studentGroups.length; i++) {
                        if (vm.studentGroups[i].id == groupperiod.id) {
                            vm.studentGroups.splice(i, 1, groupperiod);
                            foundgroup = true;
                        }
                    }
                    if (!foundgroup) {
                        vm.studentGroups.push(groupperiod);
                    }
                }

                function cancelAddToGroup() {

                    $mdToast.show(
                        $mdToast.simple()
                        .content('Rol toevoegen geannuleerd')
                        .position('bottom right')
                        .hideDelay(2000)
                    );
                }
            });
        }



        $scope.$watch('vm.student.firstName + vm.student.lastName', function() {
            vm.student.displayName = vm.student.firstName + ' ' + vm.student.lastName;
        });
    }
})();
