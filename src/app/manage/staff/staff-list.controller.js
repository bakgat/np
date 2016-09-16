(function() {
    'use strict';

    angular
        .module('app.manage')
        .controller('StaffListController', StaffListController);

    /* @ngInject */
    function StaffListController($scope, $filter, $location, $state, $mdMedia, $mdBottomSheet,
        $stateParams, $mdDialog, $mdToast, $rootScope, staff, StaffService) {
        var vm = this;

        vm.baseState = 'triangular.manage.staff';
        vm.composeClick = composeClick;
        vm.inboxBasePath = $location.path();

        vm.openMember = openMember;
        // store selected student if we have one
        vm.selectedMember = null;
        // variable to store backup of emailGroups for search filtering
        var memberGroupsBackup = null;


        init();
        ////////////////////
        function init() {
            //checkEmailList();
            vm.staff = staff;
            createMemberGroups();
        }

        function createMemberGroups() {
            // create email groups using the emails from the resolve


            var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            vm.memberGroups = [];
            angular.forEach(letters, function(letter) {
                vm.memberGroups.push({
                    name: letter,
                    staff: []
                });
            });

            angular.forEach(vm.memberGroups, function(group) {
                group.staff = $filter('personGroup')(vm.staff, group);
            });

            // create backup of emailGroups for search filtering
            memberGroupsBackup = angular.copy(vm.memberGroups);

        }

        // opens an member
        function openMember(member) {
            $state.go(vm.baseState + '.member', {
                memberId: member.id
            });
        }

        // returns back to email list
        function openlist() {
            $state.go(vm.baseState);
        }


        // opens the compose dialog
        function composeClick($event) {
            $mdDialog.show({
                    controller: 'ComposeStaffController',
                    controllerAs: 'vm',
                    templateUrl: 'app/manage/staff/compose-staff.tmpl.html',
                    targetEvent: $event,
                    locals: {
                        person: {
                            firstName: '',
                            lastName: '',
                            email: '',
                            gender: '',
                            birthday: null
                        }
                    }
                })
                .then(saveMember, cancelMember);

            function cancelMember() {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('triTranslate')('Geannuleerd'))
                    .position('bottom right')
                    .hideDelay(3000)
                );
            }
        }

        function saveMember(member) {
            StaffService.post(member).then(insertMember);
        }

        function insertMember(member) {
            var foundMember = false;
            var i = 0;
            for (i = 0; i < vm.staff.length; i++) {
                if (vm.staff[i].id == member.id) {
                    vm.staff.splice(i, 1, member);
                    foundMember = true;
                }
            }
            if (!foundMember) {
                vm.staff.push(member);
            }
            createMemberGroups();
        }

        //Watches
        $scope.$on('memberOpenend', function($event, member) {
            vm.selectedMember = member.id;
        });
        $scope.$on('memberSaved', function($event, member) {
            insertMember(member);
        });
        // handle close student event sent from student menu in student view
        $scope.$on('closeMember', function() {
            vm.selectedMember = null;
            openlist();
        });




        function checkEmailList() {
            vm.showEmailList = !($mdMedia('xs') && angular.isDefined($state.current.resolve.email));
        }


        // add a watch for when the url location changes
        $scope.$on('$locationChangeSuccess', checkEmailList);
    }
})();
