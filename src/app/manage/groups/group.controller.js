(function() {
    'use strict';

    angular
        .module('app.manage')
        .controller('GroupController', GroupController);

    /* @ngInject */
    function GroupController($scope, group, _, triTheming, $timeout) {
        var vm = this;

        vm.group = null;
        vm.backup = angular.copy(group);

        //actions
        vm.toggleActive = toggleActive;
        vm.closeGroup = closeGroup;
        vm.revert = revert;
        vm.save = save;


        init();
        /////////////////////////////////

        function init() {
            vm.group = group;

            $scope.$emit('groupOpenend', vm.group);

            loadStudents();

        }

        function toggleActive() {
            vm.group.active = !vm.group.active;
            vm.group.save().then(groupSaved);
        }

        function closeGroup() {
            $scope.$emit('closeGroup');
        }

        function revert() {
            vm.group = angular.copy(vm.backup);
            collapseOptions();
        }

        function save() {
            vm.backup = angular.copy(vm.group);
            vm.group.save().then(groupSaved);
        }

        function groupSaved(response) {
            $scope.$emit('groupSaved', vm.group);
            collapseOptions();
        }

        function collapseOptions() {
            $scope.$broadcast('closeItems');
        }

        function loadStudents() {
            group.all('students').getList()
                .then(function(response) {
                    vm.students = response;
                });
        }


    }
})();
