(function() {
    'use strict';

    angular
        .module('app.manage')
        .controller('GroupListController', GroupListController);

    /* @ngInject */
    function GroupListController($scope, $filter, $location, $state, $cacheFactory, $mdDialog,
        groups, GroupService, BaseStateService) {
        var vm = this;

        vm.groups = [];

        //actions
        vm.openGroup = openGroup;
        vm.composeGroup = composeGroup;

        vm.selectedGroup = null;


        init();
        ////////////////////
        function init() {
            BaseStateService.setBaseState('triangular.manage.groups');
            vm.groups = groups;
        }

        function openGroup(group) {
            $state.go(BaseStateService.baseState + '.group', {
                groupId: group.id
            });

        }

        function openlist() {
            $state.go(BaseStateService.baseState);
        }

        function composeGroup($event) {
            $mdDialog.show({
                    controller: 'ComposeGroupController',
                    controllerAs: 'vm',
                    templateUrl: 'app/manage/compose-group.tmpl.html',
                    targetEvent: $event,
                    locals: {
                        group: {
                            name: '',
                            active: true
                        }
                    },
                    getFocus: false
                })
                .then(saveGroup);
        }

        function saveGroup(group) {
            GroupService.post(group)
                .then(insertGroup);
        }

        function insertGroup(group) {
            var foundGroup = false;
            var i = 0;
            for (i = 0; i < vm.groups.length; i++) {
                if (vm.groups[i].id == group.id) {
                    vm.groups.splice(i, 1, group);
                    foundGroup = true;
                }
            }
            if (!foundGroup) {
                vm.groups.push(group);
            }
        }
        $scope.$on('groupOpenend', function($event, group) {
            vm.selectedGroup = group.id;
        });
        $scope.$on('groupSaved', function($event, group) {
            insertGroup(group);
        });
        $scope.$on('closeGroup', function() {
            vm.selectedGroup = null;
            openlist();
        });
        
    }
})();
