(function() {
    'use strict';

    angular
        .module('app.global')
        .directive('selectGroups', selectGroups);

    /* @ngInject */
    function selectGroups() {       
        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                'active': '=',
                'onlyOwned': '='
            },
            templateUrl: 'app/global/groups/select-groups.tmpl.html',
            controller: SelectGroupsController,
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;
        ////////////////////////

        function link($scope, $element, attrs) {}
    }

    /* @ngInject */
    function SelectGroupsController(BaseStateService, $state, UserService) {
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
            $state.go(BaseStateService.baseState, {}, { reload: true });
        }
    }

})();
