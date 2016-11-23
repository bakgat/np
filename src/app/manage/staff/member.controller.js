(function() {
    'use strict';

    angular
        .module('app.manage')
        .controller('MemberController', MemberController);

    /* @ngInject */
    function MemberController($scope, $stateParams, $mdDialog, $mdToast, $filter, member) {
        var vm = this;

        vm.member = null;
        vm.staffRoles = [];
        vm.backup = angular.copy(member);

        //actions
        vm.closeMember = closeMember;
        vm.revert = revert;
        vm.save = save;
        vm.collapseAll = collapseOptions;

        vm.addToGroup = addToGroup;
        vm.openGroup = addToGroup;
        vm.addToRole = addToRole;
        vm.openRole = addToRole;

        init();
        ///////////////////////

        function init() {
            vm.member = member;
            vm.member.birthday = new Date(vm.member.birthday);

            member.all('roles').getList().then(function(response) {
                vm.staffRoles = response;
            });
            member.all('groups').getList().then(function(response) {
                vm.staffInGroups = response;
            });

            $scope.$emit('memberOpenend', vm.member);
        }

        function closeMember() {
            $scope.$emit('closeMember');
        }

        function revert() {
            vm.member = angular.copy(vm.backup);
            collapseOptions();
        }

        function save()  {
            vm.backup = angular.copy(vm.member);
            vm.member.save().then(memberSaved);
        }

        function memberSaved(response) {
            $scope.$emit('memberSaved', vm.member);
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
                    from: 'staff'
                }
            }).then(function(groupperiod) {
                //Convert date to string to override UTC timezone conversion
                groupperiod.start = $filter('date')(groupperiod.start, 'yyyy-MM-dd');
                groupperiod.end = $filter('date')(groupperiod.end, 'yyyy-MM-dd');
                
                if (groupperiod.id) {
                    groupperiod.save().then(insertGroup, cancelAddToGroup);
                } else {
                    vm.staffInGroups.post(groupperiod).then(insertGroup, cancelAddToGroup);
                }


                function insertGroup(groupperiod) {
                    var foundgroup = false;
                    var i = 0;
                    for (i = 0; i < vm.staffInGroups.length; i++) {
                        if (vm.staffInGroups[i].id == groupperiod.id) {
                            vm.staffInGroups.splice(i, 1, groupperiod);
                            foundgroup = true;
                        }
                    }
                    if (!foundgroup) {
                        vm.staffInGroups.push(groupperiod);
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

        function addToRole($event, roleperiod) {
            if (roleperiod) {
                roleperiod.start = $filter('fromNtDate')(roleperiod.start);
                roleperiod.end = $filter('fromNtDate')(roleperiod.end);
            } else {
                roleperiod = {
                    start: new Date(),
                    end: null,
                    role: {}
                }
            }
            $mdDialog.show({
                controller: 'AddToRoleDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/manage/roles/add-to-role-dialog.tmpl.html',
                targetEvent: $event,
                focusOnOpen: false,
                locals: {
                    roleperiod: roleperiod
                }
            }).then(function(roleperiod) {
                //Convert date to string to override UTC timezone conversion
                roleperiod.start = $filter('date')(roleperiod.start, 'yyyy-MM-dd');
                roleperiod.end = $filter('date')(roleperiod.end, 'yyyy-MM-dd');

                if (roleperiod.id) {
                    roleperiod.save().then(insertRole, cancelAddToRole);
                } else {
                    vm.staffRoles.post(roleperiod).then(insertRole, cancelAddToRole);
                }


                function insertRole(roleperiod) {
                    var foundRole = false;
                    var i = 0;
                    for (i = 0; i < vm.staffRoles.length; i++) {
                        if (vm.staffRoles[i].id == roleperiod.id) {
                            vm.staffRoles.splice(i, 1, roleperiod);
                            foundRole = true;
                        }
                    }
                    if (!foundRole) {
                        vm.staffRoles.push(roleperiod);
                    }
                }

                function cancelAddToRole() {
                    $mdToast.show(
                        $mdToast.simple()
                        .content('Rol toevoegen geannuleerd')
                        .position('bottom right')
                        .hideDelay(2000)
                    );
                }
            });
        }




        $scope.$watch('vm.member.firstName + vm.member.lastName', function() {
            vm.member.displayName = vm.member.firstName + ' ' + vm.member.lastName;
        });
    }
})();
