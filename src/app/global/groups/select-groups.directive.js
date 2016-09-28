(function() {
    'use strict';

    angular
        .module('app.global')
        .directive('selectGroups', selectGroups);

    /* @ngInject */
    function selectGroups() {
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
                'active': '=',
                'onlyOwned': '='
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
    function SelectGroupsController($state, UserService) {
        var vm = this;

        vm.selectedGroup = null;
        vm.switchGroup = switchGroup;

        init();
        ////////////////////

        function init() {
            UserService.allowedGroups().then(function(groups) {
                vm.groups = groups;
                UserService.getActiveGroup().then(function(group) {
                    vm.selectedGroup = group;
                });
            });
        }

        function switchGroup(group) {
            UserService.setActiveGroup(group);
            $state.go(vm.reloadState, {}, { reload: true });
        }
    }

})();
