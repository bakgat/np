(function() {
    'use strict';

    angular
        .module('app.global')
        .directive('selectGroups', selectGroups);

    /* @ngInject */
    function selectGroups($timeout, GroupService, ProfileService) {
        // Usage:
        //
        // ```html
        // <select-groups ng-value="">
        // ```
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                'reloadState': '=',
                'active': '='
            },
            templateUrl: 'app/global/groups/select-groups.tmpl.html',
            controller: SelectGroupsController,
            controllerAs: 'vm',
            bindToController: true // because the scope is isolated
        };
        return directive;
        ////////////////////////

        function link($scope, $element, attrs) {}
    }

    /* @ngInject */
    function SelectGroupsController($state, ProfileService, GroupService) {
        var vm = this;

        vm.selectedGroup = null;
        vm.switchGroup = switchGroup;

        init();
        ////////////////////

        function init() {
           
            GroupService.getList({active: vm.active}).then(function(response) {
                vm.groups = response;
                ProfileService.activeGroup().then(function(response) {
                    vm.selectedGroup = response;
                });
            });

        }

        function switchGroup(group) {
            vm.selectedGroup = group;
            ProfileService.setActiveGroup(group);
            $state.go(vm.reloadState, {}, { reload: true });
        }
    }

})();
